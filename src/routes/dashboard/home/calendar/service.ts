import type { CCategory } from '$lib/category/utils';
import { weekDays } from '$lib/components/days-checkbox/service';
import type { TTask, OnlyTTask, EEvent } from '$lib/task/utils';
import { convertToTime } from '$lib/task/utils';
import { DATE, TIME } from '$lib/utils';
import { addMinutes, addMonths, differenceInMinutes, format, setHours, setMinutes } from 'date-fns';
import { halfHourInterval } from './calendar-body/calendar-columns/calendar-rows/service';

export type EventIn = Omit<
	OnlyTTask,
	'startDate' | 'endDate' | 'duration' | 'recurringStartAt' | 'recurringEndAt'
> & {
	date: string;
	startTime: string;
	endTime: string;
	duration: string;
	recurringStartAt: string;
	recurringEndAt: string;
};

export function convertToEventIn(event: TTask): EventIn {
	return {
		id: event.id,
		name: event.name,
		description: event.description,
		date: event.startDate ? format(event.startDate, DATE) : '',
		startTime: event.startDate ? format(event.startDate, TIME) : '',
		endTime: event.endDate ? format(event.endDate, TIME) : '',
		duration: convertToTime(event.duration),
		isDone: event.isDone,
		categoryId: event.categoryId,
		isRecurring: event.isRecurring,
		recurringStartAt: event.recurringStartAt ? format(event.recurringStartAt, DATE) : '',
		recurringEndAt: event.recurringEndAt ? format(event.recurringEndAt, DATE) : '',
		recurringDaysOfWeek: event.recurringDaysOfWeek || [],
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
		categoryId: categories.find((category) => category.isDefault)?.id || categories[0]?.id || 0,
		isRecurring: false,
		recurringStartAt: format(new Date(), DATE),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringDaysOfWeek: weekDays.slice(1, 6),
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
		categoryId: categories.find((category) => category.isDefault)?.id || categories[0]?.id || 0,
		isRecurring: false,
		recurringStartAt: '',
		recurringEndAt: '',
		recurringDaysOfWeek: [],
	};
}

export function moveEvent(event: EEvent, date: Date, quarterHourInterval: number) {
	const duration = differenceInMinutes(event.endDate, event.startDate);
	return {
		...event,
		startDate: setMinutes(setHours(date, 0), quarterHourInterval * 15),
		endDate: setMinutes(setHours(date, 0), quarterHourInterval * 15 + duration),
	} satisfies TTask;
}

export async function preserveEvent(event: TTask) {
	await fetch('/dashboard/home/api', {
		method: 'POST',
		body: JSON.stringify(event),
	});
}
