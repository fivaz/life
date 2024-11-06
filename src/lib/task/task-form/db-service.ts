import type { Goal } from '$lib/goal/utils';
import { isTimed, type RecurringTimedTask, type Task } from '$lib/task/utils';

import { createDialog } from '$lib/components/dialog/service.svelte.js';
import { DB_PATH } from '$lib/consts';
import { db, storage } from '$lib/firebase';
import { isRecurring } from '$lib/task/utils';
import {
	type DocumentReference,
	collection,
	deleteDoc,
	doc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getHalfTime, sumTimes } from '$lib/task/time-utils';

// ADD

export async function addTask(data: Omit<Task, 'id'>, userId: string, file?: File | null) {
	const newTaskRef = doc(collection(db, DB_PATH.USERS, userId, DB_PATH.TASKS));

	void setDoc(newTaskRef, data);

	if (file) {
		const image = await storeImage(userId, newTaskRef.id, file);

		void updateDoc(newTaskRef, { image });

		data.image = image;
	}

	void addTaskToGoal(userId, data, newTaskRef.id);
}

function addTaskToGoal(userId: string, data: Omit<Task, 'id'>, id: string) {
	if (data.goal) {
		const goalDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.GOALS, data.goal.id);
		const goalTaskCollectionRef = doc(goalDocRef, DB_PATH.TASKS, id);
		void setDoc(goalTaskCollectionRef, data);
	}
}

// EDIT

export function editSingleRecurringEvent(
	id: string,
	recurringEvent: Omit<RecurringTimedTask, 'id'>,
	userId: string,
	targetDate: string,
	file?: File | null,
) {
	//remove all the recurring attributes from the event
	const { recurringDaysOfWeek, recurringEndAt, recurringExceptions, recurringFrequency, ...event } =
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
	data: Omit<Task, 'id'>;
	file: File | null;
	formerGoal: Goal | null;
	id: string;
	targetDate: string | undefined;
	userId: string;
	wasRecurring: boolean;
}): Promise<boolean> {
	if (isRecurring(data) && wasRecurring && targetDate) {
		const recurringData = data as Omit<RecurringTimedTask, 'id'>;
		const result = await createDialog({
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

export async function editTask(
	id: string,
	data: Omit<Task, 'id'>,
	userId: string,
	formerGoal: Goal | null,
	file: File | null,
) {
	const taskDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.TASKS, id);
	void setDoc(taskDocRef, data);

	if (file) {
		const image = await storeImage(userId, id, file);

		void updateDoc(taskDocRef, { image });
	}

	void editTaskInGoal(userId, data, formerGoal, taskDocRef);
}

async function editTaskInGoal(
	userId: string,
	data: Omit<Task, 'id'>,
	formerGoal: Goal | null,
	taskRef: DocumentReference,
) {
	const hasNewGoal = data.goal !== null;
	const hasFormerGoal = formerGoal !== null;

	if (hasNewGoal && !hasFormerGoal) {
		updateTaskInGoal(userId, taskRef, data as Omit<Task, 'id'> & { goal: Goal });
	} else if (!hasNewGoal && hasFormerGoal) {
		removeTaskFromGoal(userId, taskRef, formerGoal);
	} else if (hasNewGoal && hasFormerGoal) {
		if (data.goal!.id !== formerGoal.id) {
			removeTaskFromGoal(userId, taskRef, formerGoal);
		}
		updateTaskInGoal(userId, taskRef, data as Omit<Task, 'id'> & { goal: Goal });
	}
}

function updateTaskInGoal(
	userId: string,
	taskRef: DocumentReference,
	taskData: Omit<Task, 'id'> & { goal: Goal },
) {
	const goalDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.GOALS, taskData.goal.id);
	const goalTaskDocRef = doc(goalDocRef, DB_PATH.TASKS, taskRef.id);
	void setDoc(goalTaskDocRef, taskData);
}

function removeTaskFromGoal(userId: string, taskRef: DocumentReference, goal: Goal) {
	const goalDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.GOALS, goal.id);
	const goalTaskDocRef = doc(goalDocRef, DB_PATH.TASKS, taskRef.id);

	void deleteDoc(goalTaskDocRef);
}

export async function storeImage(userId: string, taskId: string, file: Blob): Promise<string> {
	const avatarsRef = ref(storage, `${DB_PATH.USERS}/${userId}/${DB_PATH.TASKS}/${taskId}`);
	await uploadBytes(avatarsRef, file);
	return await getDownloadURL(avatarsRef);
}

// DELETE

export async function deletePossibleSingleRecurringEvent(
	task: Task,
	userId: string,
	targetDate: string | undefined,
): Promise<boolean> {
	const { id, ...data } = task;

	if (isRecurring(task) && targetDate) {
		const result = await createDialog({
			cancelText: 'all events',
			confirmText: 'this event only',
			message: 'Do you want to delete ?',
			title: 'This is a repeating event',
		});

		if (result === null) {
			return false;
		}

		if (result) {
			addExceptionToRecurring(id, data as Omit<RecurringTimedTask, 'id'>, targetDate, userId);
		} else {
			deleteTask(id, data, userId);
		}
	} else {
		deleteTask(id, data, userId);
	}

	return true;
}

function addExceptionToRecurring(
	id: string,
	task: Omit<RecurringTimedTask, 'id'>,
	date: string,
	userId: string,
) {
	const exceptions = [...task.recurringExceptions, date];

	const taskDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.TASKS, id);
	void updateDoc(taskDocRef, { recurringExceptions: exceptions });
}

function deleteTask(id: string, data: Omit<Task, 'id'>, userId: string) {
	const taskDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.TASKS, id);
	void deleteDoc(taskDocRef);

	if (data.goal) {
		removeTaskFromGoal(userId, taskDocRef, data.goal);
	}
}

// OTHERS

export function duplicateTask(task: Task, userId: string) {
	const halfDuration = getHalfTime(task.duration);

	const { id, ...data } = { ...task };
	data.duration = halfDuration;

	void editTask(id, data, userId, null, null);

	const copyData = {
		...data,
		...(isTimed(task) ? { startTime: sumTimes(task.startTime, halfDuration) } : {}),
	};

	void addTask(copyData, userId);
}
