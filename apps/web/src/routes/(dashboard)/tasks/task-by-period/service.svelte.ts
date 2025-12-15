import { formatDate, parseDate } from '@life/shared/date';
import { addDays, addWeeks, endOfWeek } from 'date-fns';

import { categories } from '$lib/category/category.svelte';
import { buildUntimedTask, buildUntimedTaskWithDateSet } from '$lib/task/build-utils';
import { editTask } from '$lib/task/task.repository';
import { currentUser } from '$lib/user/user.utils.svelte';
import type { TaskLists } from '../service';
import { SvelteDate } from 'svelte/reactivity';

const getDateStrategies: Record<string, (currentDate: string) => string> = {
	someday: () => '',
	today: () => formatDate(new Date()),
	tomorrow: () => formatDate(addDays(new Date(), 1)),
	thisWeek: () => formatDate(endOfWeek(new Date())),
	nextWeek: () => formatDate(endOfWeek(addWeeks(new Date(), 1))),
	default: (currentDate) => currentDate,
};

export function updateTaskPeriod(tasksByPeriod: TaskLists, taskId: string) {
	for (const [period, tasks] of Object.entries(tasksByPeriod)) {
		const task = tasks.find((t) => t.id === taskId);
		if (!task) continue;

		const updateFn = getDateStrategies[period] ?? getDateStrategies.default;
		const newDate = updateFn(task.date);

		// Only update if the date is different
		if (newDate !== task.date) {
			const { id, ...data } = { ...task, date: newDate ?? '' };
			void editTask(id, data, currentUser.uid, null, null);
		}

		return;
	}
}

export function getNewTaskFromPeriod(period: string) {
	const todayFormatted = formatDate(new SvelteDate());
	const updateFn = getDateStrategies[period] ?? getDateStrategies.default;
	const newDateString = updateFn(todayFormatted);

	if (newDateString) {
		const date = parseDate(newDateString);
		return buildUntimedTaskWithDateSet(categories.value, date);
	} else {
		return Object.assign(buildUntimedTask(categories.value), {
			date: '',
		});
	}
}
