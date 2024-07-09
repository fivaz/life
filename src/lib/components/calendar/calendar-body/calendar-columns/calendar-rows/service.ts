import type { AnyEvent, AnyTask, RecurringEvent, ToDo } from '$lib/task/utils';

import { NUMBER_OF_CELLS } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
import {
	type EventsGrid,
	getEventSlots,
} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/placement-service';
import { getEndTime } from '$lib/components/task-form/service';
import { weekDays } from '$lib/components/task-form/task-form-recurring/days-checkbox/service';
import { DATE, DATETIME } from '$lib/consts';
import { convertTimeToMinutes } from '$lib/task/time-utils';
import { isRecurring, isToDo } from '$lib/task/utils';
import { endOfDay, getDay, isSameDay, isWithinInterval, parse, startOfDay } from 'date-fns';

function isRecurringOnDay(event: RecurringEvent, day: Date): boolean {
	if (
		event.recurringExceptions &&
		event.recurringExceptions.some((exceptionDate) => {
			return isWithinInterval(parse(exceptionDate, DATE, new Date()), {
				end: endOfDay(day),
				start: startOfDay(day),
			});
		})
	) {
		return false;
	}
	if (
		// don't forget to always put this inside an if to check recurringStartAt and recurringEndAt
		isWithinInterval(day, {
			end: parse(event.recurringEndAt, DATE, new Date()),
			start: parse(event.recurringStartAt, DATE, new Date()),
		})
	) {
		// Check if today is one of the recurring days of the week
		const todayDayOfWeek = getDay(day);
		return event.recurringDaysOfWeek.includes(weekDays[todayDayOfWeek]);
	}
	return false;
}

export function isToDoOnDay(task: AnyTask, day: Date): boolean {
	return isToDo(task) && isSameDay(parse(task.deadline, DATE, new Date()), day);
}

export function isEventOnDay(task: AnyTask, day: Date): boolean {
	if (isRecurring(task)) {
		return isRecurringOnDay(task, day);
	}

	if (!isToDo(task)) {
		const startDateString = `${task.date} ${task.startTime}`;
		const endDateString = `${task.date} ${getEndTime(task.startTime, task.duration)}`;

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

export function getToDos(tasks: AnyTask[], date: Date) {
	return tasks.filter((task): task is ToDo => isToDoOnDay(task, date));
}

export function getEvents(tasks: AnyTask[], date: Date) {
	const events = tasks.filter((task): task is AnyEvent => isEventOnDay(task, date));
	events.sort((a, b) => convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime));
	return events;
}

export function getTimeSlots(events: AnyEvent[]): string[][] {
	const timeSlots = new Array(NUMBER_OF_CELLS).fill(null).map<string[]>(() => []);

	for (const event of events) {
		const { endSlot, startSlot } = getEventSlots(event);
		for (let i = startSlot; i < endSlot; i++) {
			timeSlots[i].push(event.id);
		}
	}

	return timeSlots;
}

export function assignColumns(events: AnyEvent[]): Record<string, number> {
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

export function getEventGrid(events: AnyEvent[]): EventsGrid {
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
