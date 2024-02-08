import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import type { AnyEvent, Event } from '$lib/task/utils';

import { DATE, TIME } from '$lib/consts';
import { addMinutes, format, setHours, setMinutes } from 'date-fns';

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
		endTime: buildDate(date, quarterHourInterval + 0.5),
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
		endTime: format(addMinutes(new Date(), 15), TIME),
		goal,
		id: '',
		isDone: false,
		name: '',
		startTime: format(new Date(), TIME),
	};
}

function sumTime(startTime: string, duration: string) {
	const date1 = new Date(`2000-01-01T${startTime}:00`);
	const date2 = new Date(`2000-01-01T${duration}:00`);

	const sumDate = addMinutes(date1, date2.getMinutes());

	return format(sumDate, TIME);
}

export function moveEvent(event: AnyEvent, date: string, startTime: string): AnyEvent {
	const endTime = sumTime(startTime, event.duration);

	return {
		...event,
		date,
		endTime,
		startTime,
	};
}
