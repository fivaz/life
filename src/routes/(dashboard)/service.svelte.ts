import { type Task, isRecurring } from '$lib/task/utils';

import { editSingleRecurringEvent, editTask } from '$lib/task/task-form/db-service';
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
	event: Task,
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

export function persistToDos(userId: string, toDos: Task[]) {
	toDos.forEach((toDo) => {
		const { id, ...data } = toDo;
		void editTask(id, data, userId, null, null);
	});
}

const tasksWeekHashMap = $state<Record<string, { unique: Task[]; recurring: Task[] }>>({});

export const tasks = {
	get value() {
		return Object.values(tasksWeekHashMap).flatMap((entry) => [
			...entry.unique,
			...entry.recurring,
		]);
	},
};

export function getWeekTasks(userId: string, startOfWeek: Date): void {
	const weekStartString = format(startOfWeek, DATE);
	// only fetch tasks for other weeks that haven't been fetched previously
	if (!tasksWeekHashMap[weekStartString]) {
		subscribeToWeekTasks(userId, startOfWeek);
	}
}

function queryWeekTasks(userId: string, startOfWeek: Date): [Query<Task>, Query<Task>] {
	const startOfWeekString = format(startOfWeek, DATE);
	const endOfWeekString = format(endOfWeek(startOfWeek, { weekStartsOn: 1 }), DATE);
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

export function subscribeToWeekTasks(userId: string, startOfWeek: Date) {
	const startOfWeekString = format(startOfWeek, DATE);
	tasksWeekHashMap[startOfWeekString] = { unique: [], recurring: [] };

	const [recurringQuery, uniqueQuery] = queryWeekTasks(userId, startOfWeek);

	// Use onSnapshot to listen for real-time updates for both queries
	const unsubscribeRecurring = onSnapshot(recurringQuery, (snapshot) =>
		updateTasksFromSnapshot(snapshot, startOfWeekString, 'recurring'),
	);

	const unsubscribeDate = onSnapshot(uniqueQuery, (snapshot) =>
		updateTasksFromSnapshot(snapshot, startOfWeekString, 'unique'),
	);

	// Return a function to unsubscribe from both snapshots
	return () => {
		unsubscribeRecurring();
		unsubscribeDate();
	};
}

// Helper function to update tasks in the store from Firestore snapshots
function updateTasksFromSnapshot(
	snapshot: QuerySnapshot<Task>,
	startOfWeek: string,
	taskType: keyof (typeof tasksWeekHashMap)[string],
) {
	tasksWeekHashMap[startOfWeek][taskType] = snapshot.docs.map(
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
