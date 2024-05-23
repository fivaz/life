import type { Goal } from '$lib/goal/utils';
import type { AnyTask, RecurringEvent } from '$lib/task/utils';

import { createModal } from '$lib/components/dialog/service';
import { TIME } from '$lib/consts';
import { db, storage } from '$lib/firebase';
import { add, differenceInMinutes, format, isSameDay } from 'date-fns';
import {
	type DocumentReference,
	collection,
	deleteDoc,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
		void editTask(id, data, userId, null, null);
	}
}

export function editSingleRecurringEvent(
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

export async function editTaskWithPrompt({
	data,
	file,
	formerGoal,
	id,
	targetDate,
	userId,
	wasRecurring,
}: {
	data: Omit<AnyTask, 'id'>;
	file: File | null;
	formerGoal: Goal | null;
	id: string;
	targetDate: string | undefined;
	userId: string;
	wasRecurring: boolean;
}): Promise<boolean> {
	if ('recurringStartAt' in data && wasRecurring && targetDate) {
		const recurringData = data as Omit<RecurringEvent, 'id'>;
		const result = await createModal({
			cancelText: 'future events',
			confirmText: 'this event only',
			message: 'Do you want to save the changes for ?',
			title: 'This is a repeating event',
		});

		if (result === null) {
			return false;
		}
		if (result) {
			editSingleRecurringEvent(id, recurringData, userId, targetDate, file);
		} else {
			void editTask(id, recurringData, userId, formerGoal, file);
		}
	} else {
		void editTask(id, data, userId, formerGoal, file);
	}
	return true;
}

async function editTaskInGoal(
	userId: string,
	data: Omit<AnyTask, 'id'>,
	formerGoal: Goal | null,
	taskRef: DocumentReference,
) {
	const hasNewGoal = data.goal !== null;
	const hasFormerGoal = formerGoal !== null;

	if (hasNewGoal && !hasFormerGoal) {
		updateTaskInGoal(userId, taskRef, data as Omit<AnyTask, 'id'> & { goal: Goal });
	} else if (!hasNewGoal && hasFormerGoal) {
		removeTaskFromGoal(userId, taskRef, formerGoal);
	} else if (hasNewGoal && hasFormerGoal) {
		if (data.goal!.id !== formerGoal.id) {
			removeTaskFromGoal(userId, taskRef, formerGoal);
		}
		updateTaskInGoal(userId, taskRef, data as Omit<AnyTask, 'id'> & { goal: Goal });
	}
}

function updateTaskInGoal(
	userId: string,
	taskRef: DocumentReference,
	taskData: Omit<AnyTask, 'id'> & { goal: Goal },
) {
	const goalDocRef = doc(db, 'users', userId, 'goals', taskData.goal.id);
	const goalTaskDocRef = doc(goalDocRef, 'tasks', taskRef.id);
	void setDoc(goalTaskDocRef, taskData);
}

function removeTaskFromGoal(userId: string, taskRef: DocumentReference, goal: Goal) {
	const goalDocRef = doc(db, 'users', userId, 'goals', goal.id);
	const goalTaskDocRef = doc(goalDocRef, 'tasks', taskRef.id);

	void deleteDoc(goalTaskDocRef);
}

export async function editTask(
	id: string,
	data: Omit<AnyTask, 'id'>,
	userId: string,
	formerGoal: Goal | null,
	file: File | null,
) {
	const taskDocRef = doc(db, 'users', userId, 'tasks', id);
	void setDoc(taskDocRef, data);

	if (file) {
		const image = await storeImage(userId, id, file);

		void updateDoc(taskDocRef, { image });
	}

	void editTaskInGoal(userId, data, formerGoal, taskDocRef);
}

function addTaskToGoal(userId: string, data: Omit<AnyTask, 'id'>, id: string) {
	if (data.goal) {
		const goalDocRef = doc(db, 'users', userId, 'goals', data.goal.id);
		const goalTaskCollectionRef = doc(goalDocRef, 'tasks', id);
		void setDoc(goalTaskCollectionRef, data);
	}
}

export async function storeImage(userId: string, taskId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `users/${userId}/tasks/${taskId}`);
	await uploadBytes(avatarsRef, file);
	return await getDownloadURL(avatarsRef);
}

export async function addTask(data: Omit<AnyTask, 'id'>, userId: string, file?: File | null) {
	const newTaskRef = doc(collection(db, 'users', userId, 'tasks'));

	void setDoc(newTaskRef, data);

	if (file) {
		const image = await storeImage(userId, newTaskRef.id, file);

		void updateDoc(newTaskRef, { image });

		void addTaskToGoal(userId, { ...data, image }, newTaskRef.id);
	} else {
		void addTaskToGoal(userId, { ...data }, newTaskRef.id);
	}
}

function deleteTask(id: string, data: Omit<AnyTask, 'id'>, userId: string) {
	const taskDocRef = doc(db, 'users', userId, 'tasks', id);
	void deleteDoc(taskDocRef);

	if (data.goal) {
		removeTaskFromGoal(userId, taskDocRef, data.goal);
	}
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

export async function deletePossibleSingleRecurringEvent(
	task: AnyTask,
	userId: string,
	targetDate: string | undefined,
): Promise<boolean> {
	const { id, ...data } = task;

	if ('recurringStartAt' in task && targetDate) {
		const result = await createModal({
			cancelText: 'all events',
			confirmText: 'this event only',
			message: 'Do you want to delete ?',
			title: 'This is a repeating event',
		});

		if (result === null) {
			return false;
		}

		if (result) {
			addExceptionToRecurring(id, data as Omit<RecurringEvent, 'id'>, targetDate, userId);
		} else {
			deleteTask(id, data, userId);
		}
	} else {
		deleteTask(id, data, userId);
	}

	return true;
}
