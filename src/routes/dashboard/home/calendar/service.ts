import type { CCategory } from '$lib/category/utils';
import { weekDays } from '$lib/components/days-checkbox/service';
import { DATE, TIME } from '$lib/consts';
import type { TTask, OnlyTTask, EEvent } from '$lib/task/utils';
import { convertToTime } from '$lib/task/utils';
import { addMinutes, addMonths, differenceInMinutes, format, setHours, setMinutes } from 'date-fns';
import { halfHourInterval } from './calendar-body/calendar-columns/calendar-rows/service';

export type TaskIn = Omit<
	OnlyTTask,
	'startDate' | 'endDate' | 'duration' | 'recurringStartAt' | 'recurringEndAt'
> & {
	date: string;
	startTime: string;
	endTime: string;
	duration: string;
	isRecurring: boolean;
	wasRecurring: boolean;
	recurringStartAt: string;
	recurringEndAt: string;
	isEvent: boolean;
};

export function convertToEventIn(event: TTask): TaskIn {
	return {
		id: event.id,
		name: event.name,
		description: event.description,
		isEvent: !!(event.startDate && event.endDate && event.duration),
		date: format(event.startDate || new Date(), DATE),
		startTime: format(event.startDate || new Date(), TIME),
		endTime: format(event.endDate || addMinutes(new Date(), 15), TIME),
		duration: convertToTime(event.duration || 15),
		isDone: event.isDone,
		categoryId: event.categoryId,
		isRecurring: event.isRecurring,
		wasRecurring: event.isRecurring,
		recurringStartAt: format(event.recurringStartAt || new Date(), DATE),
		recurringEndAt: format(event.recurringEndAt || addMonths(new Date(), 1), DATE),
		recurringDaysOfWeek: event.recurringDaysOfWeek.length
			? event.recurringDaysOfWeek
			: weekDays.slice(1, 6),
	};
}

export function buildEmptyTaskIn(categories: CCategory[], isEvent: boolean): TaskIn {
	return {
		id: 0,
		name: '',
		description: null,
		isEvent,
		date: format(new Date(), DATE),
		startTime: format(new Date(), TIME),
		endTime: format(addMinutes(new Date(), 15), TIME),
		duration: '00:15',
		isDone: false,
		categoryId: categories.find((category) => category.isDefault)?.id || categories[0]?.id || 0,
		isRecurring: false,
		wasRecurring: false,
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
): TaskIn {
	return {
		id: 0,
		name: '',
		description: null,
		isEvent: true,
		date: format(date, DATE),
		startTime: buildDate(date, quarterHourInterval),
		endTime: buildDate(date, quarterHourInterval + 0.5),
		duration: '00:15',
		isDone: false,
		categoryId: categories.find((category) => category.isDefault)?.id || categories[0]?.id || 0,
		isRecurring: false,
		wasRecurring: false,
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
