import type { AnyEvent, Task, ToDo } from '$lib/task/utils';

import { editPossibleSingleRecurringEvent, editTask } from '$lib/components/task-form/service';
import { DATE, DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { endOfWeek, format } from 'date-fns';
import {
	collection,
	onSnapshot,
	Query,
	query,
	type QuerySnapshot,
	where,
} from 'firebase/firestore';

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

export const externalTasks = $state<Task[]>([]);

// eslint-disable-next-line prefer-const
let savedWeeks = $state<string[]>([]);

export function getWeekTasks(userId: string, startOfWeek: Date): void {
	const weekStartString = format(startOfWeek, DATE);
	// only fetch tasks for other weeks that haven't been fetched previously
	if (!savedWeeks.includes(weekStartString)) {
		savedWeeks.push(weekStartString);
		subscribeToWeekTasks(userId, startOfWeek);
	}
}

function queryWeekTasks(userId: string, startOfWeek: Date): [Query<Task>, Query<Task>] {
	const startOfWeekString = format(startOfWeek, DATE);
	const endOfWeekString = format(endOfWeek(startOfWeek, { weekStartsOn: 1 }), DATE);
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
	snapshot.docs.forEach((doc) => {
		addTask({ ...doc.data(), id: doc.id });
	});
}

function addTask(newTask: Task): void {
	const index = externalTasks.findIndex((task) => task.id === newTask.id);
	if (index == -1) {
		externalTasks.push(newTask);
	} else {
		externalTasks[index] = newTask;
	}
}

export function removeLocalTask(task: Task) {
	const index = externalTasks.findIndex((existingTask) => existingTask.id === task.id);
	if (!index) return;
	externalTasks.splice(index, 1);
}
