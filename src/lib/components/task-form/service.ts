import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import type { AnyTask, Event, RecurringEvent, Task, ToDo } from '$lib/task/utils';
import type { EventDispatcher } from 'svelte';

import { weekDays } from '$lib/components/days-checkbox/service';
import { createModal } from '$lib/components/dialog/service';
import { DATE, TIME } from '$lib/consts';
import { db } from '$lib/firebase';
import {
	add,
	addMinutes,
	addMonths,
	differenceInMinutes,
	endOfWeek,
	format,
	parse,
} from 'date-fns';
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

export type TaskIn = Omit<Task, 'recurringExceptions'> & {
	isEvent: boolean;
	isRecurring: boolean;
	recurringExceptions: Date[];
};

function convertToDo(todo: ToDo): TaskIn {
	return {
		isEvent: false,
		isRecurring: false,
		...todo,
		date: format(new Date(), DATE),
		duration: '00:15',
		endTime: format(addMinutes(new Date(), 15), TIME),
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringExceptions: [],
		recurringStartAt: format(new Date(), DATE),
		startTime: format(new Date(), TIME),
	};
}

function convertRecurring(event: RecurringEvent): TaskIn {
	return {
		isEvent: true,
		isRecurring: true,
		...event,
		deadline: format(endOfWeek(new Date()), DATE),
		recurringExceptions: event.recurringExceptions.map((date) => parse(date, DATE, new Date())),
	};
}

function convertEvent(event: Event): TaskIn {
	return {
		isEvent: true,
		isRecurring: false,
		...event,
		deadline: format(endOfWeek(new Date()), DATE),
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringExceptions: [],
		recurringStartAt: format(new Date(), DATE),
	};
}

export function convertToTaskIn(task: AnyTask): TaskIn {
	if ('deadline' in task) {
		return convertToDo(task);
	} else {
		if ('recurringStartAt' in task) {
			return convertRecurring(task);
		} else {
			return convertEvent(task);
		}
	}
}

export function buildEmptyTask(categories: Category[], goal: Goal | null = null): Task {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		date: format(new Date(), DATE),
		deadline: format(endOfWeek(new Date()), DATE),
		description: '',
		duration: '00:15',
		endTime: format(addMinutes(new Date(), 15), TIME),
		goal,
		id: '',
		isDone: false,
		name: '',
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringExceptions: [],
		recurringStartAt: format(new Date(), DATE),
		startTime: format(new Date(), TIME),
	};
}

export function getEndTime(startTime: string, duration: string): string {
	if (!startTime || !duration) {
		return '';
	}
	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [DurationHours, durationMinutes] = duration.split(':').map(Number);

	const startTimeDate = new Date(1, 0, 0, startTimeHours, startTimeMinutes);

	const totalDate = add(startTimeDate, { hours: DurationHours, minutes: durationMinutes });
	return format(totalDate, TIME);
}

export function getDuration(startTime: string, endTime: string): string {
	if (!startTime || !endTime) {
		return '';
	}
	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [endTimeHours, endTimeMinutes] = endTime.split(':').map(Number);

	const startTimeDate = new Date(0, 0, 0, startTimeHours, startTimeMinutes);
	const endTimeDate = new Date(0, 0, 0, endTimeHours, endTimeMinutes);

	const totalMinutes = differenceInMinutes(endTimeDate, startTimeDate);
	const totalHours = Math.floor(totalMinutes / 60);
	const remainingMinutes = totalMinutes % 60;

	return format(new Date(0, 0, 0, totalHours, remainingMinutes), TIME);
}

export function editPossibleSingleRecurringEvent(
	id: string,
	data: Omit<AnyTask, 'id'>,
	userId: string,
	targetDate: string,
) {
	if ('recurringStartAt' in data) {
		editSingleRecurringEvent(id, data as Omit<RecurringEvent, 'id'>, userId, targetDate);
	} else {
		editTask(id, data, userId);
	}
}

export function editSingleRecurringEvent(
	id: string,
	recurringEvent: Omit<RecurringEvent, 'id'>,
	userId: string,
	targetDate: string,
) {
	// create a clone event but on the new date
	const { recurringDaysOfWeek, recurringEndAt, recurringExceptions, recurringStartAt, ...event } =
		recurringEvent;

	const newEvent = { ...event, date: targetDate };

	addTask(newEvent, userId);

	addExceptionToRecurring(id, recurringEvent, targetDate, userId);
}

export async function editTaskWithPrompt(
	id: string,
	data: Omit<AnyTask, 'id'>,
	userId: string,
	targetDate: string | undefined,
	wasRecurring: boolean,
) {
	if ('recurringStartAt' in data && wasRecurring && targetDate) {
		const recurringData = data as Omit<RecurringEvent, 'id'>;
		const result = await createModal({
			cancelText: 'future events',
			confirmText: 'this event only',
			message: 'Do you want to save the changes for ?',
			title: 'This is a repeating event',
		});

		if (result === null) {
			return;
		}

		if (result) {
			editSingleRecurringEvent(id, recurringData, userId, targetDate);
		} else {
			editTask(id, recurringData, userId);
		}
	} else {
		editTask(id, data, userId);
	}
}

export function editTask(id: string, data: Omit<AnyTask, 'id'>, userId: string) {
	const taskDocRef = doc(db, 'users', userId, 'tasks', id);
	void setDoc(taskDocRef, data);
}

export function addTask(data: Omit<AnyTask, 'id'>, userId: string) {
	const tasksCollectionRef = collection(db, 'users', userId, 'tasks');
	void addDoc(tasksCollectionRef, data);
}

function deleteTask(id: string, userId: string) {
	const taskDocRef = doc(db, 'users', userId, 'tasks', id);
	void deleteDoc(taskDocRef);
}

function addExceptionToRecurring(
	id: string,
	task: Omit<RecurringEvent, 'id'>,
	date: string,
	userId: string,
) {
	const exceptions = [...task.recurringExceptions, date];

	const taskDocRef = doc(db, 'users', userId, 'tasks', id);
	void updateDoc(taskDocRef, { recurringExceptions: exceptions });
}

export async function removeTask(
	task: AnyTask,
	userId: string,
	targetDate: string | undefined,
	dispatch: EventDispatcher<{ close: null }>,
) {
	if (task.id) {
		const { id, ...data } = task;

		if ('recurringStartAt' in task && targetDate) {
			const result = await createModal({
				cancelText: 'all events',
				confirmText: 'this event only',
				message: 'Do you want to delete ?',
				title: 'This is a repeating event',
			});

			if (result === null) {
				return;
			}

			if (result) {
				addExceptionToRecurring(id, data as Omit<RecurringEvent, 'id'>, targetDate, userId);
			} else {
				deleteTask(id, userId);
			}
		} else {
			deleteTask(id, userId);
		}
		dispatch('close');
	}
}
