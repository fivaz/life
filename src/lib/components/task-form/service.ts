import type { Category } from '$lib/category/utils';
import { weekDays } from '$lib/components/days-checkbox/service';
import { createModal } from '$lib/components/dialog/service';
import { DATE, TIME } from '$lib/consts';
import { db } from '$lib/firebase';
import type { Goal } from '$lib/goal/utils';
import type { Task, AnyTask, RecurringEvent, ToDo, Event } from '$lib/task/utils';
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
import type { EventDispatcher } from 'svelte';

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
		startTime: format(new Date(), TIME),
		endTime: format(addMinutes(new Date(), 15), TIME),
		duration: '00:15',
		recurringStartAt: format(new Date(), DATE),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringExceptions: [],
	};
}

function convertRecurring(event: RecurringEvent): TaskIn {
	return {
		isEvent: true,
		isRecurring: true,
		...event,
		recurringExceptions: event.recurringExceptions.map((date) => parse(date, DATE, new Date())),
		deadline: format(endOfWeek(new Date()), DATE),
	};
}

function convertEvent(event: Event): TaskIn {
	return {
		isEvent: true,
		isRecurring: false,
		...event,
		deadline: format(endOfWeek(new Date()), DATE),
		recurringStartAt: format(new Date(), DATE),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringExceptions: [],
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
		id: '',
		name: '',
		description: '',
		date: format(new Date(), DATE),
		isDone: false,
		category: categories.find((category) => category.isDefault) || categories[0],
		goal,
		deadline: format(endOfWeek(new Date()), DATE),
		startTime: format(new Date(), TIME),
		endTime: format(addMinutes(new Date(), 15), TIME),
		duration: '00:15',
		recurringStartAt: format(new Date(), DATE),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringExceptions: [],
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
	targetDate: Date,
) {
	if ('recurringStartAt' in data) {
		editSingleRecurringEvent(id, data as Omit<RecurringEvent, 'id'>, userId, targetDate);
	} else {
		editTask(id, data, userId);
	}
}

export function editSingleRecurringEvent(
	id: string,
	data: Omit<RecurringEvent, 'id'>,
	userId: string,
	targetDate: Date,
) {
	const date = format(targetDate, DATE);

	// remove te recurring attributes
	const {
		recurringStartAt,
		recurringEndAt,
		recurringDaysOfWeek,
		recurringExceptions,
		...eventData
	} = data;

	const newEvent = { ...eventData, date };

	void addTask(newEvent, userId);

	const exceptions = [...data.recurringExceptions, date];

	const taskDocRef = doc(db, 'users', userId, 'tasks', id);
	void updateDoc(taskDocRef, { recurringExceptions: exceptions });
}

export async function editTaskWithPrompt(
	id: string,
	data: Omit<AnyTask, 'id'>,
	userId: string,
	targetDate: Date | undefined,
	wasRecurring: boolean,
) {
	if ('recurringStartAt' in data && wasRecurring && targetDate) {
		const recurringData = data as Omit<RecurringEvent, 'id'>;
		const result = await createModal({
			title: 'This is a repeating event',
			message: 'Do you want to save the changes for ?',
			confirmText: 'this event only',
			cancelText: 'future events',
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

export async function deleteTask(
	id: string | undefined,
	userId: string,
	dispatch: EventDispatcher<{ close: null }>,
) {
	const result = await createModal({ title: 'Are you sure?' });
	if (result && id) {
		const taskDocRef = doc(db, 'users', userId, 'tasks', id);
		await deleteDoc(taskDocRef);
		dispatch('close');
	}
}
