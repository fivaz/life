import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import type { Task } from '$lib/task/utils';

import { DATE, TIME } from '$lib/consts';
import { format } from 'date-fns';

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
		date: format(date, DATE),
		duration: '00:15',
		image: '',
		recurringFrequency: '',
		recurringDaysOfWeek: [],
		recurringEndAt: '',
		recurringExceptions: [],
		startTime: '',
	};
}
