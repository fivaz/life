import type { CCategory } from '$lib/category/utils';
import type { EEvent, OnlyEEvent } from '$lib/event/utils';
import { convertToTime } from '$lib/event/utils';
import { DATE, TIME } from '$lib/utils';
import { addMinutes, differenceInMinutes, format, setHours, setMinutes } from 'date-fns';

export type EventIn = Omit<OnlyEEvent, 'startDate' | 'endDate' | 'duration'> & {
	date: string;
	startTime: string;
	endTime: string;
	duration: string;
};

export function convertToEventIn(event: EEvent): EventIn {
	return {
		id: event.id,
		name: event.name,
		description: event.description,
		date: format(event.startDate, DATE),
		startTime: format(event.startDate, TIME),
		endTime: format(event.endDate, TIME),
		duration: convertToTime(event.duration),
		isDone: event.isDone,
		categoryId: event.categoryId,
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
		duration: '00:15',
		isDone: false,
		categoryId: categories.find((category) => category.isDefault)?.id || 0,
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
		duration: '00:15',
		isDone: false,
		categoryId: categories.find((category) => category.isDefault)?.id || 0,
	};
}

export function moveEvent(event: EEvent, date: Date, timeInterval: number) {
	console.log('event.startDate', event.startDate);
	console.log('event.endDate', event.endDate);
	const duration = differenceInMinutes(event.endDate, event.startDate);
	console.log(duration);
	const newEvent = {
		...event,
		startDate: setMinutes(setHours(date, 0), timeInterval * 30),
		endDate: setMinutes(setHours(date, 0), timeInterval * 30 + duration),
	} satisfies EEvent;

	console.log(newEvent);
	return newEvent;
}

export async function preserveEvent(event: EEvent) {
	await fetch('/dashboard/home/api', {
		method: 'POST',
		body: JSON.stringify(event),
	});
}
