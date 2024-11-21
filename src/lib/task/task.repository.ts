import { endOfWeek } from 'date-fns';
import type { DocumentReference, Query, QueryConstraint } from 'firebase/firestore';
import { collection, deleteDoc, doc, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { DB_PATH } from '$lib/consts';
import { formatDate, weekStartsOn } from '$lib/date.utils.svelte';
import { db, storage } from '$lib/firebase';
import type { Goal } from '$lib/goal/goal.model';
import { fetchItems } from '$lib/repository.svelte';
import type { Task } from '$lib/task/task.model';
import { taskSchema } from '$lib/task/task.model';

export function getTaskPath(userId: string) {
	return `${DB_PATH.USERS}/${userId}/${DB_PATH.TASKS}`;
}

export function fetchTasks(tasks: Task[], constrains?: QueryConstraint): void {
	fetchItems(tasks, DB_PATH.TASKS, taskSchema, constrains);
}

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

export function deleteTask(id: string, data: Omit<Task, 'id'>, userId: string) {
	const taskDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.TASKS, id);
	void deleteDoc(taskDocRef);

	if (data.goal) {
		removeTaskFromGoal(userId, taskDocRef, data.goal);
	}
}

export function addExceptionToRecurring(
	id: string,
	task: Omit<Task, 'id'>,
	date: string,
	userId: string,
) {
	const exceptions = [...task.recurringExceptions, date];

	const taskDocRef = doc(db, DB_PATH.USERS, userId, DB_PATH.TASKS, id);
	void updateDoc(taskDocRef, { recurringExceptions: exceptions });
}

export function queryWeekTasks(userId: string, startOfWeek: Date): [Query<Task>, Query<Task>] {
	const startOfWeekString = formatDate(startOfWeek);
	const endOfWeekString = formatDate(endOfWeek(startOfWeek, { weekStartsOn }));
	const tasksRef = collection(db, `${DB_PATH.USERS}/${userId}/${DB_PATH.TASKS}`);
	return [
		query(tasksRef, where('recurringFrequency', '!=', null)) as Query<Task>,
		query(
			tasksRef,
			where('date', '>=', startOfWeekString),
			where('date', '<=', endOfWeekString),
		) as Query<Task>,
	];
}
