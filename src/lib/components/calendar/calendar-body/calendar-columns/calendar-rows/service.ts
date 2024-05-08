import type { AnyEvent, AnyTask, RecurringEvent, ToDo } from '$lib/task/utils';

import { NUMBER_OF_CELLS } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
import {
	getEndSlot,
	getStartSlot,
} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/placement-service';
import { getEndTime } from '$lib/components/task-form/service';
import { weekDays } from '$lib/components/task-form/task-form-recurring/days-checkbox/service';
import { DATE, DATETIME } from '$lib/consts';
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
	return !!(
		'deadline' in task &&
		task.deadline &&
		isSameDay(parse(task.deadline, DATE, new Date()), day)
	);
}

export function isEventOnDay(task: AnyTask, day: Date): boolean {
	if ('recurringStartAt' in task && task.recurringStartAt) {
		return isRecurringOnDay(task as RecurringEvent, day);
	}

	if ('date' in task) {
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
	return tasks.filter((task): task is AnyEvent => isEventOnDay(task, date));
}

export function getTimeSlots(events: AnyEvent[]): string[][] {
	const timeSlots = new Array(NUMBER_OF_CELLS).fill(null).map<string[]>(() => []);

	for (const event of events) {
		const startSlot = getStartSlot(event);
		const endSlot = getEndSlot(event);
		for (let i = startSlot; i < endSlot; i++) {
			timeSlots[i].push(event.id);
		}
	}

	return timeSlots;
}
