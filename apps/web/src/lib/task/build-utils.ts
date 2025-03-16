import { averageRound15, floorRound15, formatDate, formatTime } from '@life/shared/date';
import type { Task } from '@life/shared/task';

import type { Category } from '$lib/category/category.model';
import type { Goal } from '$lib/goal/goal.model';

export function buildTimedTask(categories: Category[], goal: Goal | null = null): Task {
	const now = floorRound15(new Date());
	return Object.assign(buildUntimedTask(categories, now, goal), {
		startTime: formatTime(now),
	});
}

export function buildUntimedTaskWithDateSet(categories: Category[], date: Date): Task {
	return buildUntimedTask(categories, date);
}

export function buildTimedTaskWithTimeSet(categories: Category[], date: Date): Task {
	const roundedDate = averageRound15(date);
	return Object.assign(buildUntimedTask(categories, roundedDate), {
		startTime: formatTime(roundedDate),
	});
}

export function buildUntimedTask(
	categories: Category[],
	date: Date = new Date(),
	goal: Goal | null = null,
): Task {
	return {
		id: '',
		name: '',
		description: '',
		goal,
		isDone: false,
		category: categories[0],
		createdAt: new Date().toISOString(),
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
