import type { AnyTask } from '$lib/task/utils';
import type { Query } from 'firebase/firestore';

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

export function onChangeWeekStart(newWeekStart: Date, query: Query<AnyTask>): void {
	const newWeekStartString = format(newWeekStart, DATE);
	savedWeeks.update((weeks) => {
		// only fetch tasks for other weeks, if they haven't been fetched previously
		if (!weeks.includes(newWeekStartString)) {
			weeks.push(newWeekStartString);
			subscribeToWeekTasks(query);
		}

		return weeks;
	});
}

export function subscribeToWeekTasks(query: Query<AnyTask>) {
	return onSnapshot(
		query,
		(querySnapshot) => {
			tasks.update((existingTasks) => {
				const updatedTasks = [...existingTasks]; // Start with the existing tasks

				querySnapshot.docs.forEach((doc) => {
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
		},
		(error) => {
			console.error('Error fetching tasks: ', error);
		},
	);
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
