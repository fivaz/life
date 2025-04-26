import { formatDate, parseDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { addDays, addWeeks, endOfWeek, startOfWeek } from 'date-fns';

import { editTask } from '$lib/task/task.repository';
import { currentUser } from '$lib/user/user.utils.svelte';

import type { TaskLists } from '../service';

export function updateTaskPeriod(tasksByPeriod: TaskLists, taskId: string) {
	for (const [listKey, tasks] of Object.entries(tasksByPeriod)) {
		const task = tasks.find((t) => t.id === taskId);
		if (!task) continue;

		console.log(listKey);

		let newDate: string | null = null;

		const updateFn = updateStrategies[listKey];
		if (updateFn) {
			// Create a clone to not mutate the original task yet
			const clonedTask = { ...task };
			updateFn(clonedTask);
			newDate = clonedTask.date;
		} else {
			const parsedDate = parseDate(listKey);
			if (parsedDate) {
				newDate = formatDate(parsedDate);
			}
		}

		// Only update if the date is different
		if (newDate !== task.date) {
			const { id, ...data } = { ...task, date: newDate ?? '' };
			void editTask(id, data, currentUser.uid, null, null);
		}

		return;
	}
}

const updateStrategies: Record<string, (task: Task) => void> = {
	// if it's overdue it's because the drag was cancelled
	overdue: () => {},
	someday: (task) => {
		task.date = '';
	},
	today: (task) => {
		task.date = formatDate(new Date());
	},
	tomorrow: (task) => {
		task.date = formatDate(addDays(new Date(), 1));
	},
	thisWeek: (task) => {
		task.date = formatDate(endOfWeek(new Date()));
	},
	nextWeek: (task) => {
		task.date = formatDate(startOfWeek(addWeeks(new Date(), 1)));
	},
};
