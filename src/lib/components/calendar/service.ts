import type { AnyTask } from '$lib/task/utils';
import type { Query, QuerySnapshot } from 'firebase/firestore';

import { DATE } from '$lib/consts';
import { addDays, differenceInMilliseconds, endOfToday, format, startOfWeek } from 'date-fns';
import { onSnapshot } from 'firebase/firestore';
import { derived, writable } from 'svelte/store';

// list of weekStarts in which the tasks have already been fetched
export const savedWeeks = writable<string[]>([]);

export const weekStart = writable<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

export const selectedDate = writable<Date>(new Date());

export const tasks = writable<AnyTask[]>([]);

export const dates = derived(weekStart, ($weekStart) =>
	Array.from({ length: 7 }, (_, i) => addDays($weekStart, i)),
);

export function onChangeWeekStart(
	newWeekStart: Date,
	queries: [Query<AnyTask>, Query<AnyTask>],
): void {
	const newWeekStartString = format(newWeekStart, DATE);
	savedWeeks.update((weeks) => {
		// only fetch tasks for other weeks, if they haven't been fetched previously
		if (!weeks.includes(newWeekStartString)) {
			weeks.push(newWeekStartString);
			subscribeToWeekTasks(queries);
		}

		return weeks;
	});
}

// Helper function to update tasks in the store from Firestore snapshots
function updateTasksFromSnapshot(snapshot: QuerySnapshot<AnyTask>) {
	tasks.update((existingTasks) => {
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

export function subscribeToWeekTasks([dateQuery, deadlineQuery]: [Query<AnyTask>, Query<AnyTask>]) {
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

export function updateDateAtMidnight() {
	console.warn('updateDateAtMidnight');
	const now = new Date();
	const timeUntilMidnight = differenceInMilliseconds(endOfToday(), now);

	setTimeout(() => {
		selectedDate.set(new Date());
		updateDateAtMidnight(); // Schedule the next update for the following midnight
	}, timeUntilMidnight);
}

export function removeLocalTask(task: AnyTask) {
	tasks.update((existingTasks) =>
		existingTasks.filter((existingTask) => existingTask.id !== task.id),
	);
}
