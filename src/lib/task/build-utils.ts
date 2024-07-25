import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import type { Event, ToDo } from '$lib/task/utils';

import { DATE, TIME } from '$lib/consts';
import { endOfWeek, format } from 'date-fns';

export function buildEmptyToDo(categories: Category[]): ToDo {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		createdAt: new Date().toISOString(),
		deadline: format(endOfWeek(new Date(), { weekStartsOn: 1 }), DATE),
		description: '',
		duration: '',
		goal: null,
		id: '',
		isDone: false,
		name: '',
	};
}

export function buildEmptyEvent(categories: Category[], goal: Goal | null = null): Event {
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

export function buildToDoWithDeadline(categories: Category[], deadline: string): ToDo {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		createdAt: new Date().toISOString(),
		deadline,
		description: '',
		duration: '00:15',
		goal: null,
		id: '',
		isDone: false,
		name: '',
	};
}
export function buildEventWithTime(categories: Category[], date: Date): Event {
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
