import type { CCategory } from '$lib/category/utils';
import type { EEvent } from '$lib/event/utils';
import { DATE, TIME } from '$lib/utils';
import { addMinutes, format, setHours, setMinutes } from 'date-fns';

export type EventIn = Omit<EEvent, 'startDate' | 'endDate'> & {
	date: string;
	startTime: string;
	endTime: string;
};

export function convertToEventIn(event: EEvent): EventIn {
	return {
		id: event.id,
		name: event.name,
		description: event.description,
		date: format(event.startDate, DATE),
		startTime: format(event.startDate, TIME),
		endTime: format(event.endDate, TIME),
		isDone: event.isDone,
		categoryId: event.categoryId,
		category: event.category,
	};
}

export function buildEmptyEventIn(categories: CCategory[]): EventIn {
	return {
		id: 0,
		name: '',
		description: null,
		date: format(new Date(), DATE),
		startTime: format(new Date(), TIME),
		endTime: format(addMinutes(new Date(), 15), TIME),
		isDone: false,
		categoryId: categories[0].id,
		category: categories[0],
	};
}

function buildDate(date: Date, timeInterval: number) {
	if (timeInterval < 0 || timeInterval > 48) {
		throw 'Invalid number. Please enter a number between 0 and 48.';
	}

	const datetime = setMinutes(setHours(date, 0), timeInterval * 30);

	return format(datetime, TIME);
}

export function buildEventWithTime(
	categories: CCategory[],
	date: Date,
	timeInterval: number,
): EventIn {
	return {
		id: 0,
		name: '',
		description: null,
		date: format(date, DATE),
		startTime: buildDate(date, timeInterval),
		endTime: buildDate(date, timeInterval + 0.5),
		isDone: false,
		categoryId: categories[0].id,
		category: categories[0],
	};
}
