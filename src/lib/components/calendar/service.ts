import type { AnyTask } from '$lib/task/utils';
import type { Query } from 'firebase/firestore';

import { addDays, startOfWeek } from 'date-fns';
import { onSnapshot } from 'firebase/firestore';
import { derived, writable } from 'svelte/store';

export const weekStart = writable<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

export const selectedDate = writable<Date>(new Date());

export const tasks = writable<AnyTask[]>([]);

export const dates = derived(weekStart, ($weekStart) =>
	Array.from({ length: 7 }, (_, i) => addDays($weekStart, i)),
);

export function subscribeToWeekTasks(query: Query<AnyTask>) {
	// Subscribe to real-time updates using onSnapshot
	// Return unsubscribe function to stop listening when needed
	return onSnapshot(
		query,
		(querySnapshot) => {
			// Get the existing tasks from the store
			tasks.update((existingTasks) => {
				const existingIds = new Set(existingTasks.map((task) => task.id)); // Create a set of existing task IDs

				// Merge new tasks with existing tasks
				const newTasks = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
				const mergedTasks = [...existingTasks]; // Start with the existing tasks

				newTasks.forEach((task) => {
					if (!existingIds.has(task.id)) {
						// Check for duplicates
						mergedTasks.push(task); // Add only unique tasks
					}
				});

				return mergedTasks; // Return the updated array of tasks
			});
		},
		(error) => {
			console.error('Error fetching tasks: ', error);
		},
	);
}
