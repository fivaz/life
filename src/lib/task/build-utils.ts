import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import type { Task } from '$lib/task/utils';

import { DATE, TIME } from '$lib/consts';
import { format } from 'date-fns';

export function buildUntimedTask(categories: Category[]): Task {
	const now = format(new Date(), TIME);
	return buildSimplestTask(now, categories);
}

export function buildTimedTask(categories: Category[], goal: Goal | null = null): Task {
	const now = new Date();
	return Object.assign(buildSimplestTask(format(now, DATE), categories, goal), {
		startTime: format(now, TIME),
	});
}

export function buildUntimedTaskWithDateSet(categories: Category[], date: string): Task {
	return buildSimplestTask(date, categories);
}

export function buildTimedTaskWithTimeSet(categories: Category[], date: Date): Task {
	return Object.assign(buildSimplestTask(format(date, DATE), categories), {
		startTime: format(date, TIME),
	});
}

function buildSimplestTask(date: string, categories: Category[], goal: Goal | null = null): Task {
	const defaultCategory = categories.find((category) => category.isDefault) || categories[0];

	return {
		id: '',
		name: '',
		description: '',
		goal,
		isDone: false,
		category: defaultCategory,
		createdAt: date,
		date,
		duration: '00:15',
		image: '',
		recurringFrequency: '',
		recurringDaysOfWeek: [],
		recurringEndAt: '',
		recurringExceptions: [],
		startTime: '',
	};
}
