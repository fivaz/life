import { startOfWeek } from 'date-fns';
import type { QuerySnapshot } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';

import type { HHmm, yyyyMMdd } from '$lib/date.utils.svelte';
import { formatDate } from '$lib/date.utils.svelte';
import type { Task } from '$lib/task/task.model';
import { isRecurring, taskSchema } from '$lib/task/task.model';
import { editTask, queryWeekTasks } from '$lib/task/task.repository';
import { editSingleRecurringEvent } from '$lib/task/task-form/service.svelte';

export function moveEvent(
	userId: string,
	event: Task,
	{
		date,
		duration,
		oldDate,
		startTime,
	}: { date: yyyyMMdd; duration: HHmm; oldDate: yyyyMMdd; startTime: HHmm },
) {
	const newEvent = { ...event, date, duration, startTime };
	editPossibleSingleRecurringEvent(newEvent, userId, oldDate);
}

export function persistTasks(userId: string, toDos: Task[]) {
	toDos.forEach((toDo) => {
		const { id, ...data } = toDo;
		void editTask(id, data, userId, null, null);
	});
}

const tasksWeekHashMap = $state<Record<string, { unique: Task[]; recurring: Task[] }>>({});

export const tasks = {
	get value() {
		const tasks = Object.values(tasksWeekHashMap).flatMap((entry) => [
			...entry.unique,
			...entry.recurring,
		]);

		// remove duplicates
		return Array.from(tasks.reduce((map, task) => map.set(task.id, task), new Map()).values());
	},
};

export function getWeekTasks(userId: string, date: Date): void {
	if (!userId) return;
	const weekStart = startOfWeek(date);
	const weekStartString = formatDate(weekStart);
	// only fetch tasks for other weeks that haven't been fetched previously
	if (!tasksWeekHashMap[weekStartString]) {
		subscribeToWeekTasks(userId, weekStart);
	}
}

export function subscribeToWeekTasks(userId: string, startOfWeek: Date) {
	const startOfWeekString = formatDate(startOfWeek);
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
	tasksWeekHashMap[startOfWeek][taskType] = snapshot.docs.map((doc) => {
		const task = { ...doc.data(), id: doc.id };
		const validation = taskSchema.safeParse(task);

		if (!validation.success) {
			console.warn(`validation failed for task: ${task.id}, ${validation.error}`);
		}

		return task;
	});
}

export function editPossibleSingleRecurringEvent(
	event: Task,
	userId: string,
	targetDate: yyyyMMdd,
) {
	const { id, ...data } = event;
	if (isRecurring(data)) {
		void editSingleRecurringEvent(id, data, userId, targetDate);
	} else {
		void editTask(id, data, userId, null, null);
	}
}
