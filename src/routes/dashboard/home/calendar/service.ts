import type { CCategory } from '$lib/category/utils';
import type { EEvent, OnlyEEvent } from '$lib/event/utils';
import { convertToTime } from '$lib/event/utils';
import { DATE, TIME } from '$lib/utils';
import { addMinutes, differenceInMinutes, format, setHours, setMinutes } from 'date-fns';
import { halfHourInterval } from './calendar-body/calendar-columns/calendar-rows/service';

export type EventIn = Omit<OnlyEEvent, 'startDate' | 'endDate' | 'duration'> & {
	date: string;
	startTime: string;
	endTime: string;
	duration: string;
	isRecurrent: boolean;
	recurrent: {
		startAt: string;
		endAt: string;
		daysOfWeek: string[];
	};
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
		recurrentId: event.recurrentId,
		isRecurrent: event.recurrentId != null,
		recurrent: {
			startAt: event.recurrent?.startAt.toString() || '',
			endAt: event.recurrent?.endAt.toString() || '',
			daysOfWeek: event.recurrent?.daysOfWeek || [],
		},
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
		recurrentId: null,
		isRecurrent: false,
		recurrent: {
			startAt: '',
			endAt: '',
			daysOfWeek: [],
		},
	};
}

function buildDate(date: Date, timeInterval: number) {
	if (timeInterval < 0 || timeInterval > halfHourInterval * 2) {
		throw 'Invalid number. Please enter a number between 0 and 95.';
	}

	const datetime = setMinutes(setHours(date, 0), timeInterval * 15);

	return format(datetime, TIME);
}

export function buildEventWithTime(
	categories: CCategory[],
	date: Date,
	quarterHourInterval: number,
): EventIn {
	console.log('quarterHourInterval', quarterHourInterval);
	return {
		id: 0,
		name: '',
		description: null,
		date: format(date, DATE),
		startTime: buildDate(date, quarterHourInterval),
		endTime: buildDate(date, quarterHourInterval + 0.5),
		duration: '00:15',
		isDone: false,
		categoryId: categories.find((category) => category.isDefault)?.id || 0,
		recurrentId: null,
		isRecurrent: false,
		recurrent: {
			startAt: '',
			endAt: '',
			daysOfWeek: [],
		},
	};
}

export function moveEvent(event: EEvent, date: Date, quarterHourInterval: number) {
	const duration = differenceInMinutes(event.endDate, event.startDate);
	return {
		...event,
		startDate: setMinutes(setHours(date, 0), quarterHourInterval * 15),
		endDate: setMinutes(setHours(date, 0), quarterHourInterval * 15 + duration),
	} satisfies EEvent;
}

export async function preserveEvent(event: EEvent) {
	await fetch('/dashboard/home/api', {
		method: 'POST',
		body: JSON.stringify(event),
	});
}
