import type { CCategory } from '$lib/category/utils';
import type { TaskIn } from '$lib/components/task-form/service';
import { DATE, homeRoute, TIME } from '$lib/consts';
import type { EEvent, TTask } from '$lib/task/utils';
import { differenceInMinutes, format, setHours, setMinutes } from 'date-fns';
import type { SerializedEvent } from '../api/service';
import { deserializeEvent } from '../api/service';
import { halfHourInterval } from './calendar-body/calendar-columns/calendar-rows/service';

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
