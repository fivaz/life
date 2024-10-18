import type { AnyEvent, Task, ToDo } from '$lib/task/utils';

import { editPossibleSingleRecurringEvent, editTask } from '$lib/components/task-form/service';
import { DATE, DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { endOfWeek, format } from 'date-fns';
import {
	Query,
	type QuerySnapshot,
	collection,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import { writable } from 'svelte/store';

export function moveEvent(
	userId: string,
	event: AnyEvent,
	{
		date,
		duration,
		oldDate,
		startTime,
	}: { date: string; duration: string; oldDate: string; startTime: string },
) {
	const newEvent = { ...event, date, duration, startTime };
	editPossibleSingleRecurringEvent(newEvent, userId, oldDate);
}

export function persistToDos(userId: string, toDos: ToDo[]) {
	toDos.forEach((toDo) => {
		const { id, ...data } = toDo;
		void editTask(id, data, userId, null, null);
	});
}

export const externalTasksStore = writable<Task[]>([]);

export const savedWeeks = writable<string[]>([]);

export function getWeekTasks(userId: string, startOfWeek: Date): void {
	const weekStartString = format(startOfWeek, DATE);
	savedWeeks.update((weeks) => {
		// only fetch tasks for other weeks that haven't been fetched previously
		if (!weeks.includes(weekStartString)) {
			weeks.push(weekStartString);
			subscribeToWeekTasks(userId, startOfWeek);
		}

		return weeks;
	});
}

function queryWeekTasks(userId: string, startOfWeek: Date): [Query<Task>, Query<Task>] {
	const startOfWeekString = format(startOfWeek, DATE);
	const endOfWeekString = format(endOfWeek(startOfWeek), DATE);
	const goalsRef = collection(db, `${DB_PATH.USERS}/${userId}/${DB_PATH.TASKS}`);
	return [
		query(
			goalsRef,
			where('date', '>=', startOfWeekString),
			where('date', '<=', endOfWeekString),
		) as Query<Task>,
		query(
			goalsRef,
			where('deadline', '>=', startOfWeekString),
			where('deadline', '<=', endOfWeekString),
		) as Query<Task>,
	];
}

export function subscribeToWeekTasks(userId: string, startOfWeek: Date) {
	const [dateQuery, deadlineQuery] = queryWeekTasks(userId, startOfWeek);

	// Use onSnapshot to listen for real-time updates for both queries
	const unsubscribeDate = onSnapshot(dateQuery, (dateSnapshot) =>
		updateTasksFromSnapshot(dateSnapshot),
	);

	const unsubscribeDeadline = onSnapshot(deadlineQuery, (deadlineSnapshot) =>
		updateTasksFromSnapshot(deadlineSnapshot),
	);

	// Return a function to unsubscribe from both snapshots
	return () => {
		unsubscribeDate();
		unsubscribeDeadline();
	};
}

// Helper function to update tasks in the store from Firestore snapshots
function updateTasksFromSnapshot(snapshot: QuerySnapshot<Task>) {
	externalTasksStore.update((existingTasks) => {
		const updatedTasks = [...existingTasks];

		snapshot.docs.forEach((doc) => {
			const newTask = { ...doc.data(), id: doc.id };

			// Check if the task already exists
			const existingIndex = updatedTasks.findIndex((task) => task.id === newTask.id);

			if (existingIndex > -1) {
				// If it exists, replace the existing task
				updatedTasks[existingIndex] = newTask;
			} else {
				// If it doesn't exist, add the new task
				updatedTasks.push(newTask);
			}
		});

		return updatedTasks;
	});
}
