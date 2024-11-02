import { type AnyEvent, isRecurring, type Task, type ToDo } from '$lib/task/utils';

import { editSingleRecurringEvent, editTask } from '$lib/task/task-form/service';
import { DATE, DB_PATH } from '$lib/consts';
import { db } from '$lib/firebase';
import { endOfWeek, format } from 'date-fns';
import {
	collection,
	onSnapshot,
	type Query,
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

export const _tasksByWeek = $state<Record<string, { events: Task[]; todos: Task[] }>>({});

export const tasks = {
	get value() {
		return Object.values(_tasksByWeek).flatMap((entry) => [...entry.events, ...entry.todos]);
	},
};

export function getWeekTasks(userId: string, startOfWeek: Date): void {
	const weekStartString = format(startOfWeek, DATE);
	// only fetch tasks for other weeks that haven't been fetched previously
	if (!_tasksByWeek[weekStartString]) {
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
	const startOfWeekString = format(startOfWeek, DATE);
	_tasksByWeek[startOfWeekString] = { events: [], todos: [] };

	const [dateQuery, deadlineQuery] = queryWeekTasks(userId, startOfWeek);

	// Use onSnapshot to listen for real-time updates for both queries
	const unsubscribeDate = onSnapshot(dateQuery, (dateSnapshot) =>
		updateTasksFromSnapshot(dateSnapshot, startOfWeekString, 'events'),
	);

	const unsubscribeDeadline = onSnapshot(deadlineQuery, (deadlineSnapshot) =>
		updateTasksFromSnapshot(deadlineSnapshot, startOfWeekString, 'todos'),
	);

	// Return a function to unsubscribe from both snapshots
	return () => {
		unsubscribeDate();
		unsubscribeDeadline();
	};
}

// Helper function to update tasks in the store from Firestore snapshots
function updateTasksFromSnapshot(
	snapshot: QuerySnapshot<Task>,
	startOfWeek: string,
	taskType: 'events' | 'todos',
) {
	_tasksByWeek[startOfWeek][taskType] = snapshot.docs.map(
		(doc) => ({ ...doc.data(), id: doc.id }) as Task,
	);
}

export function editPossibleSingleRecurringEvent(event: Task, userId: string, targetDate: string) {
	const { id, ...data } = event;
	if (isRecurring(data)) {
		void editSingleRecurringEvent(id, data, userId, targetDate);
	} else {
		void editTask(id, data, userId, null, null);
	}
}
