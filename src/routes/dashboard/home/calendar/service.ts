import type { Category } from '$lib/category/utils';
import { DATE, TIME } from '$lib/consts';
import type { OptionalId } from '$lib/form-utils';
import type { Goal } from '$lib/goal/utils';
import type { AnyEvent, Event } from '$lib/task/utils';
import { getDuration } from '$lib/task/utils';
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
): OptionalId<Event> {
	return {
		name: '',
		description: '',
		date: format(date, DATE),
		startTime: buildDate(date, quarterHourInterval),
		endTime: buildDate(date, quarterHourInterval + 0.5),
		duration: '00:15',
		isDone: false,
		category: categories.find((category) => category.isDefault) || categories[0],
		goal: undefined,
	};
}

export function buildEmptyEvent(categories: Category[], goal?: Goal): OptionalId<Event> {
	return {
		name: '',
		description: '',
		date: format(new Date(), DATE),
		startTime: format(new Date(), TIME),
		endTime: format(addMinutes(new Date(), 15), TIME),
		duration: '00:15',
		isDone: false,
		category: categories.find((category) => category.isDefault) || categories[0],
		goal,
	};
}

export function moveEvent(event: AnyEvent, date: Date, quarterHourInterval: number) {
	return {
		...event,
		date: format(date, DATE),
		startTime: format(setMinutes(setHours(date, 0), quarterHourInterval * 15), TIME),
		endTime: format(
			setMinutes(setHours(date, 0), quarterHourInterval * 15 + getDuration(event)),
			TIME,
		),
	} satisfies AnyEvent;
}
