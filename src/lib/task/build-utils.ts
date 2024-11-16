import { format } from 'date-fns';

import type { Category } from '$lib/category/category.model';
import { TIME } from '$lib/consts';
import type { Goal } from '$lib/goal/goal.model';
import type { Task } from '$lib/task/task.model';
import { formatDate } from '$lib/utils.svelte';

export function buildTimedTask(categories: Category[], goal: Goal | null = null): Task {
	const now = new Date();
	return Object.assign(buildUntimedTask(categories, now, goal), {
		startTime: format(now, TIME),
	});
}

export function buildUntimedTaskWithDateSet(categories: Category[], date: Date): Task {
	return buildUntimedTask(categories, date);
}

export function buildTimedTaskWithTimeSet(categories: Category[], date: Date): Task {
	return Object.assign(buildUntimedTask(categories, date), {
		startTime: format(date, TIME),
	});
}

export function buildUntimedTask(
	categories: Category[],
	date: Date = new Date(),
	goal: Goal | null = null,
): Task {
	const defaultCategory = categories.find((category) => category.isDefault) || categories[0];

	return {
		id: '',
		name: '',
		description: '',
		goal,
		isDone: false,
		category: defaultCategory,
		createdAt: date.toISOString(),
		date: formatDate(date),
		duration: '00:15',
		image: '',
		recurringFrequency: null,
		recurringDaysOfWeek: [],
		recurringEndAt: null,
		recurringExceptions: [],
		startTime: null,
	};
}
