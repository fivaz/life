import type { CCategory } from '$lib/category/utils';
import { weekDays } from '$lib/components/days-checkbox/service';
import { DATE, homeRoute, TIME } from '$lib/consts';
import type { EEvent, OnlyTTask, TTask } from '$lib/task/utils';
import { convertToTime } from '$lib/task/utils';
import {
	addMinutes,
	addMonths,
	differenceInMinutes,
	endOfWeek,
	format,
	setHours,
	setMinutes,
} from 'date-fns';
import type { SerializedEvent } from '../api/service';
import { deserializeEvent } from '../api/service';
import { halfHourInterval } from './calendar-body/calendar-columns/calendar-rows/service';

export type TaskIn = Omit<
	OnlyTTask,
	'startDate' | 'endDate' | 'duration' | 'deadline' | 'recurringStartAt' | 'recurringEndAt'
> & {
	date: string;
	startTime: string;
	endTime: string;
	duration: string;
	deadline: string;
	isRecurring: boolean;
	wasRecurring: boolean;
	recurringStartAt: string;
	recurringEndAt: string;
	isEvent: boolean;
};

export function convertToTaskIn(task: TTask): TaskIn {
	return {
		id: task.id,
		name: task.name,
		description: task.description,
		isEvent: !!(task.startDate && task.endDate && task.duration),
		date: format(task.startDate || new Date(), DATE),
		startTime: format(task.startDate || new Date(), TIME),
		endTime: format(task.endDate || addMinutes(new Date(), 15), TIME),
		duration: convertToTime(task.duration || 15),
		deadline: task.deadline ? format(task.deadline || new Date(), DATE) : '',
		isDone: task.isDone,
		categoryId: task.categoryId,
		goalId: task.goalId,
		isRecurring: task.isRecurring,
		wasRecurring: task.isRecurring,
		recurringStartAt: format(task.recurringStartAt || new Date(), DATE),
		recurringEndAt: format(task.recurringEndAt || addMonths(new Date(), 1), DATE),
		recurringDaysOfWeek: task.recurringDaysOfWeek.length
			? task.recurringDaysOfWeek
			: weekDays.slice(1, 6),
		recurringExceptions: task.recurringExceptions,
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
		deadline: format(endOfWeek(new Date()), DATE),
		isDone: false,
		categoryId: categories.find((category) => category.isDefault)?.id || categories[0]?.id || 0,
		goalId: null,
		isRecurring: false,
		wasRecurring: false,
		recurringStartAt: format(new Date(), DATE),
		recurringEndAt: format(addMonths(new Date(), 1), DATE),
		recurringDaysOfWeek: weekDays.slice(1, 6),
		recurringExceptions: [],
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
		deadline: format(date, DATE),
		isDone: false,
		categoryId: categories.find((category) => category.isDefault)?.id || categories[0]?.id || 0,
		goalId: null,
		isRecurring: false,
		wasRecurring: false,
		recurringStartAt: '',
		recurringEndAt: '',
		recurringDaysOfWeek: [],
		recurringExceptions: [],
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

export async function preserveEvent(event: TTask): Promise<EEvent[]> {
	const response = await fetch(`${homeRoute}/api`, {
		method: 'POST',
		body: JSON.stringify(event),
	});

	const serializedEvents: SerializedEvent[] = await response.json();

	return serializedEvents.map((event) => deserializeEvent(event));
}
