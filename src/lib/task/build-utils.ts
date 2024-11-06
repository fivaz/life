import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import type { TimedTask, UnTimedTask } from '$lib/task/utils';

import { DATE, TIME } from '$lib/consts';
import { endOfWeek, format } from 'date-fns';

export function buildEmptyToDo(categories: Category[]): UnTimedTask {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		createdAt: new Date().toISOString(),
		date: format(endOfWeek(new Date(), { weekStartsOn: 1 }), DATE),
		description: '',
		duration: '00:15',
		goal: null,
		id: '',
		isDone: false,
		name: '',
	};
}

export function buildEmptyEvent(categories: Category[], goal: Goal | null = null): TimedTask {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		createdAt: new Date().toISOString(),
		date: format(new Date(), DATE),
		description: '',
		duration: '00:15',
		goal,
		id: '',
		isDone: false,
		name: '',
		startTime: format(new Date(), TIME),
	};
}

export function buildToDoWithDate(categories: Category[], date: string): UnTimedTask {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		createdAt: new Date().toISOString(),
		date,
		description: '',
		duration: '00:15',
		goal: null,
		id: '',
		isDone: false,
		name: '',
	};
}
export function buildEventWithTime(categories: Category[], date: Date): TimedTask {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		createdAt: new Date().toISOString(),
		date: format(date, DATE),
		description: '',
		duration: '00:15',
		goal: null,
		id: '',
		isDone: false,
		name: '',
		startTime: format(date, TIME),
	};
}
