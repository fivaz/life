import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import type { Event } from '$lib/task/utils';

import { DATE, TIME } from '$lib/consts';
import { format, setHours, setMinutes } from 'date-fns';

import { halfHourInterval } from './calendar-body/calendar-columns/calendar-rows/service';

function buildDate(date: Date, timeInterval: number) {
	if (timeInterval < 0 || timeInterval > halfHourInterval * 2) {
		throw 'Invalid number. Please enter a number between 0 and 95.';
	}

	const datetime = setMinutes(setHours(date, 0), timeInterval * 15);

	return format(datetime, TIME);
}

export function buildEventWithTime(
	categories: Category[],
	date: Date,
	quarterHourInterval: number,
): Event {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
		date: format(date, DATE),
		description: '',
		duration: '00:15',
		goal: null,
		id: '',
		isDone: false,
		name: '',
		startTime: buildDate(date, quarterHourInterval),
	};
}

export function buildEmptyEvent(categories: Category[], goal: Goal | null = null): Event {
	return {
		category: categories.find((category) => category.isDefault) || categories[0],
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
