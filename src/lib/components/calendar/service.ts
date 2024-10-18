import type { Task } from '$lib/task/utils';

import { addDays, differenceInMilliseconds, endOfToday, startOfWeek } from 'date-fns';
import { derived, writable } from 'svelte/store';

// list of weekStarts in which the tasks have already been fetched

export const weekStart = writable<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

export const selectedDate = writable<Date>(new Date());

export const tasks = writable<Task[]>([]);

export const dates = derived(weekStart, ($weekStart) =>
	Array.from({ length: 7 }, (_, i) => addDays($weekStart, i)),
);

export function updateDateAtMidnight() {
	console.warn('updateDateAtMidnight');
	const now = new Date();
	const timeUntilMidnight = differenceInMilliseconds(endOfToday(), now);

	setTimeout(() => {
		selectedDate.set(new Date());
		updateDateAtMidnight(); // Schedule the next update for the following midnight
	}, timeUntilMidnight);
}

export function removeLocalTask(task: Task) {
	tasks.update((existingTasks) =>
		existingTasks.filter((existingTask) => existingTask.id !== task.id),
	);
}
