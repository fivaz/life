import type { Task } from '@life/lib/types';

import type { Category } from '$lib/category/category.model';
import { formatDate, formatTime } from '$lib/date.utils.svelte';
import type { Goal } from '$lib/goal/goal.model';
import { getCurrentRoundedDate } from '$lib/task/time-utils';

export function buildTimedTask(categories: Category[], goal: Goal | null = null): Task {
	const now = getCurrentRoundedDate();
	return Object.assign(buildUntimedTask(categories, now, goal), {
		startTime: formatTime(now),
	});
}

export function buildUntimedTaskWithDateSet(categories: Category[], date: Date): Task {
	return buildUntimedTask(categories, date);
}

export function buildTimedTaskWithTimeSet(categories: Category[], date: Date): Task {
	return Object.assign(buildUntimedTask(categories, date), {
		startTime: formatTime(date),
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
		recurringFrequency: '',
		recurringDaysOfWeek: [],
		recurringEndAt: '',
		recurringExceptions: [],
		startTime: '',
	};
}
