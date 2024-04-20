import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import type { AnyTask, Event, RecurringEvent, Task, ToDo } from '$lib/task/utils';
import type { EventDispatcher } from 'svelte';

import { weekDays } from '$lib/components/days-checkbox/service';
import { createModal } from '$lib/components/dialog/service';
import { DATE, TIME } from '$lib/consts';
import { db, storage } from '$lib/firebase';
import {
	add,
	addMinutes,
	addMonths,
	differenceInMinutes,
	format,
	isSameDay,
	parse,
} from 'date-fns';
import {
	type DocumentReference,
	addDoc,
	collection,
	deleteDoc,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export type TaskIn = Omit<Task, 'recurringExceptions'> & {
	endTime: string;
	isEvent: boolean;
	isRecurring: boolean;
	recurringExceptions: Date[];
};

function convertToDo(todo: ToDo): TaskIn {
	return {
		...todo,
		date: format(new Date(), DATE),
		duration: '00:15',
		endTime: format(addMinutes(new Date(), 15), TIME),
		image: todo.image || null,
		isEvent: false,
		isRecurring: false,
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringExceptions: [],
		recurringStartAt: format(new Date(), DATE),
		startTime: format(new Date(), TIME),
	};
}

function convertRecurring(event: RecurringEvent): TaskIn {
	return {
		...event,
		deadline: event.date,
		endTime: getEndTime(event.startTime, event.duration),
		image: event.image || null,
		isEvent: true,
		isRecurring: true,
		recurringExceptions: event.recurringExceptions.map((date) => parse(date, DATE, new Date())),
	};
}

function convertEvent(event: Event): TaskIn {
	return {
		...event,
		deadline: event.date,
		endTime: getEndTime(event.startTime, event.duration),
		image: event.image || null,
		isEvent: true,
		isRecurring: false,
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
		deadline: format(new Date(), DATE),
		description: '',
		duration: '00:15',
		goal,
		id: '',
		image: null,
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
	const [durationHours, durationMinutes] = duration.split(':').map(Number);

	const startTimeDate = new Date(1, 0, 0, startTimeHours, startTimeMinutes);

	const endDate = add(startTimeDate, { hours: durationHours, minutes: durationMinutes });

	if (isSameDay(startTimeDate, endDate)) {
		return format(endDate, TIME);
	}

	return '23:59';
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
	event: AnyTask,
	userId: string,
	targetDate: string,
) {
	const { id, ...data } = event;
	if ('recurringStartAt' in data) {
		void editSingleRecurringEvent(id, data, userId, targetDate);
	} else {
		editTask(id, data, userId);
	}
}

export async function editSingleRecurringEvent(
	id: string,
	recurringEvent: Omit<RecurringEvent, 'id'>,
	userId: string,
	targetDate: string,
	file?: File | null,
) {
	//remove all the recurring attributes from the event
	const { recurringDaysOfWeek, recurringEndAt, recurringExceptions, recurringStartAt, ...event } =
		recurringEvent;

	// clone the event but with a new date
	const newEvent = { ...event, date: targetDate };

	void addTask(newEvent, userId, file);

	addExceptionToRecurring(id, recurringEvent, targetDate, userId);
}

export async function editTaskWithPrompt(
	id: string,
	data: Omit<AnyTask, 'id'>,
	userId: string,
	targetDate: string | undefined,
	wasRecurring: boolean,
	file: File | null,
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
			void editSingleRecurringEvent(id, recurringData, userId, targetDate, file);
		} else {
			void editTask(id, recurringData, userId, file);
		}
	} else {
		void editTask(id, data, userId, file);
	}
}

async function editTaskInGoal(
	userId: string,
	data: Omit<AnyTask, 'id'>,
	taskRef: DocumentReference,
) {
	if (data.goal) {
		const goalDocRef = doc(db, 'users', userId, 'goals', data.goal.id);
		const goalTaskDocRef = doc(goalDocRef, 'tasks', taskRef.id);

		void setDoc(goalTaskDocRef, data);
	}
}

export async function editTask(
	id: string,
	data: Omit<AnyTask, 'id'>,
	userId: string,
	file?: File | null,
) {
	if (file) {
		data.image = await storeImage(userId, id, file);
	}

	const taskDocRef = doc(db, 'users', userId, 'tasks', id);
	void setDoc(taskDocRef, data);
	void editTaskInGoal(userId, data, taskDocRef);
}

async function addTaskToGoal(userId: string, data: Omit<AnyTask, 'id'>) {
	if (data.goal) {
		const goalDocRef = doc(db, 'users', userId, 'goals', data.goal.id);
		const goalTaskCollectionRef = collection(goalDocRef, 'tasks');

		// const taskSnap = await getDoc(taskRef);
		void addDoc(goalTaskCollectionRef, data);
	}
}

export async function addTask(data: Omit<AnyTask, 'id'>, userId: string, file?: File | null) {
	const newTaskRef = doc(collection(db, 'users', userId, 'tasks'));

	if (file) {
		data.image = await storeImage(userId, newTaskRef.id, file);
	}

	void setDoc(newTaskRef, data);

	void addTaskToGoal(userId, data);
}

async function deleteTaskFromGoal(userId: string, taskId: string, data: Omit<AnyTask, 'id'>) {
	if (data.goal) {
		const goalDocRef = doc(db, 'users', userId, 'goals', data.goal.id);
		const goalTaskDocRef = doc(goalDocRef, 'tasks', taskId);

		void deleteDoc(goalTaskDocRef);
	}
}

async function deleteTask(id: string, data: Omit<AnyTask, 'id'>, userId: string) {
	// TODO check if I can remove this id / data separation
	const taskDocRef = doc(db, 'users', userId, 'tasks', id);
	void deleteDoc(taskDocRef);

	void deleteTaskFromGoal(userId, id, data);
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
			void deleteTask(id, data, userId);
		}
	} else {
		void deleteTask(id, data, userId);
	}
	dispatch('close');
}

export async function storeImage(userId: string, taskId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `users/${userId}/tasks/${taskId}`);
	await uploadBytes(avatarsRef, file);
	return await getDownloadURL(avatarsRef);
}
