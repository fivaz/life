import {
	type AnyTimedTask,
	isTimed,
	type RecurringTimedTask,
	type Task,
	type UnTimedTask,
} from '$lib/task/utils';

import { NUMBER_OF_CELLS } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service.svelte';
import {
	type EventsGrid,
	getEventSlots,
} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/placement-service';

import { nameOfDaysOfWeek } from '$lib/task/task-form/task-form-recurring/days-checkbox/service';
import { DATE, DATETIME } from '$lib/consts';
import { convertTimeToMinutes, sumTimes } from '$lib/task/time-utils';
import { isRecurring } from '$lib/task/utils';
import {
	endOfDay,
	getDate,
	getDay,
	getMonth,
	isAfter,
	isBefore,
	isSameDay,
	isWithinInterval,
	parse,
	startOfDay,
} from 'date-fns';

function isDateAnException(event: RecurringTimedTask, date: Date): boolean {
	return event.recurringExceptions.some((exceptionDate) => {
		return isWithinInterval(parse(exceptionDate, DATE, new Date()), {
			end: endOfDay(date),
			start: startOfDay(date),
		});
	});
}

function isDailyRecurringOnDay(event: RecurringTimedTask, date: Date): boolean {
	// Check if today is one of the recurring days of the week
	const dayOfWeek = getDay(date);
	return event.recurringDaysOfWeek.includes(nameOfDaysOfWeek[dayOfWeek]);
}

function isWeeklyRecurringOnDay(event: RecurringTimedTask, date: Date): boolean {
	return getDay(event.date) === getDay(date);
}

function isMonthlyRecurringOnDay(event: RecurringTimedTask, date: Date): boolean {
	return getDate(event.date) === getDate(date);
}

function isYearlyRecurringOnDay(event: RecurringTimedTask, date: Date): boolean {
	return getDate(event.date) === getDate(date) && getMonth(event.date) === getMonth(date);
}

function isRecurringOnDay(event: RecurringTimedTask, date: Date): boolean {
	if (isAfter(date, parse(event.recurringEndAt, DATE, new Date()))) {
		return false;
	}

	if (isDateAnException(event, date)) {
		return false;
	}

	if (isBefore(date, parse(event.date, DATE, new Date()))) {
		return false;
	}

	if (event.recurringFrequency === 'daily') {
		return isDailyRecurringOnDay(event, date);
	}

	if (event.recurringFrequency === 'weekly') {
		return isWeeklyRecurringOnDay(event, date);
	}

	if (event.recurringFrequency === 'monthly') {
		return isMonthlyRecurringOnDay(event, date);
	}

	if (event.recurringFrequency === 'yearly') {
		return isYearlyRecurringOnDay(event, date);
	}

	return false;
}

export function isToDoOnDay(task: Task, day: Date): boolean {
	return !isTimed(task) && isSameDay(parse(task.date, DATE, new Date()), day);
}

export function isEventOnDay(task: Task, day: Date): boolean {
	if (isRecurring(task)) {
		return isRecurringOnDay(task, day);
	}

	if (isTimed(task)) {
		const startDateString = `${task.date} ${task.startTime}`;
		const endDateString = `${task.date} ${sumTimes(task.startTime, task.duration)}`;

		const startDate = parse(startDateString, DATETIME, new Date());
		const endDate = parse(endDateString, DATETIME, new Date());

		return (
			isWithinInterval(startDate, {
				end: endOfDay(day),
				start: startOfDay(day),
			}) ||
			isWithinInterval(endDate, {
				end: endOfDay(day),
				start: startOfDay(day),
			})
		);
	}

	return false;
}

export function getUnTimed(tasks: Task[], date: Date) {
	return tasks.filter((task): task is UnTimedTask => isToDoOnDay(task, date));
}

export function getTimed(tasks: Task[], date: Date) {
	const events = tasks.filter((task): task is AnyTimedTask => isEventOnDay(task, date));
	events.sort((a, b) => convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime));
	return events;
}

export function getTimeSlots(events: AnyTimedTask[]): string[][] {
	const timeSlots = new Array(NUMBER_OF_CELLS).fill(null).map<string[]>(() => []);

	for (const event of events) {
		const { endSlot, startSlot } = getEventSlots(event);
		for (let i = startSlot; i < endSlot; i++) {
			timeSlots[i].push(event.id);
		}
	}

	return timeSlots;
}

export function assignColumns(events: AnyTimedTask[]): Record<string, number> {
	const columnEndTimes: number[] = [];
	const eventColumns: Record<string, number> = {};

	for (const event of events) {
		const { endSlot, startSlot } = getEventSlots(event);

		let column = 0;
		while (column < columnEndTimes.length && columnEndTimes[column] > startSlot) {
			column++;
		}
		eventColumns[event.id] = column;
		columnEndTimes[column] = endSlot;
	}

	return eventColumns;
}

export function getEventGrid(events: AnyTimedTask[]): EventsGrid {
	const arrayTimeSlots = getTimeSlots(events);
	const eventColumns = assignColumns(events);
	const objectTimeSlots: EventsGrid = Array.from({ length: 96 }, () => ({}));

	arrayTimeSlots.forEach((timeSlotEvents, index) => {
		timeSlotEvents.forEach((eventId) => {
			objectTimeSlots[index][eventColumns[eventId]] = eventId;
		});
	});

	return objectTimeSlots;
}
