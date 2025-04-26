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

		const updateFn = updateStrategies[listKey];

		if (updateFn) {
			updateFn(task);
		} else {
			// Assume listKey is a date string
			const parsedDate = parseDate(listKey);
			if (parsedDate) {
				task.date = formatDate(parsedDate);
			}
		}

		const { id, ...data } = task;

		void editTask(id, data, currentUser.uid, null, null);
		return;
	}
}

const updateStrategies: Record<string, (task: Task) => void> = {
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
