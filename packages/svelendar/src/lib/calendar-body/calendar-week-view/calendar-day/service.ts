import { DATE, nameOfDaysOfWeek, parseDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { isRecurring } from '@life/shared/task';
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

import { NUMBER_OF_CELLS } from './calendar-grid/service.svelte.js';
import type { EventsGrid } from './event-panel/placement-service.js';
import { getEventSlots } from './event-panel/placement-service.js';

export function getTasksForDate(tasks: Task[], date: Date): Task[] {
	return tasks.filter((task) => isForDate(task, date));
}

export function isForDate(task: Task, date: Date): task is Task {
	if (!task.date) return false;

	if (isRecurring(task)) {
		return isRecurringOnDay(task, date);
	}

	return isSameDay(parseDate(task.date), date);
}

function isRecurringOnDay(event: Task, date: Date): boolean {
	if (event.recurringEndAt && isAfter(date, parseDate(event.recurringEndAt))) {
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

	function isDateAnException(event: Task, date: Date): boolean {
		return event.recurringExceptions.some((exceptionDate) => {
			return isWithinInterval(parse(exceptionDate, DATE, new Date()), {
				end: endOfDay(date),
				start: startOfDay(date),
			});
		});
	}

	function isDailyRecurringOnDay(event: Task, date: Date): boolean {
		// Check if today is one of the recurring days of the week
		const dayOfWeek = getDay(date);
		return event.recurringDaysOfWeek.includes(nameOfDaysOfWeek[dayOfWeek]);
	}

	function isWeeklyRecurringOnDay(event: Task, date: Date): boolean {
		return getDay(event.date) === getDay(date);
	}

	function isMonthlyRecurringOnDay(event: Task, date: Date): boolean {
		return getDate(event.date) === getDate(date);
	}

	function isYearlyRecurringOnDay(event: Task, date: Date): boolean {
		return getDate(event.date) === getDate(date) && getMonth(event.date) === getMonth(date);
	}
}

/**
 Convert a list of events into an array in which each index represent a time slot of 15 minutes of the day,
 and each item is an object where its keys represent a column and the value is the id of the event that will
 be placed in that column for the time slot

 	 [
		 // 0 = 00:00
	 	0:{0: 'eventId1'},
		 // 1 = 00:15
	 	1:{0: 'eventId2', 1: 'eventId3',...},
	 	...
		 // 94 = 23:30
	 	94:{0:'eventId99', 1: 'eventId100',...},
		 // 95 = 23:45
	 	95:{0:'eventId99', 1: 'eventId100',...},
	 ]
 */
export function getEventGrid(events: Task[]): EventsGrid {
	// the algorithm only works if events are sorted by time
	const timeSlotsByEvents = getTimeSlots(events);

	return assignColumnsToEvents(timeSlotsByEvents);
}

/**
	 Convert a list of events into a list of time slots in which each index represents 15 minutes,
	 and it contains a list of events ids that take place in that time slot:

	 [
		 // 0 = 00:00
	 	0:[eventId1],
		 // 1 = 00:15
	 	1:[eventId2, eventId3,...],
	 	...
		 // 94 = 23:30
	 	94:[eventId99, eventId100,...],
		 // 95 = 23:45
	 	95:[eventId99, eventId100,...],
	 ]
 */
function getTimeSlots(events: Task[]): string[][] {
	const timeSlots = Array.from({ length: NUMBER_OF_CELLS }, () => [] as string[]);

	events.forEach((event) => {
		const { startSlot, endSlot } = getEventSlots(event);
		for (let i = startSlot; i < endSlot; i++) {
			timeSlots[i].push(event.id);
		}
	});

	return timeSlots;
}

/**
	 Assign columns to each event from the timeslots list:

	 timeSlots list :
	  [
	 	0:[eventId1],
	 	1:[eventId2, eventId3,...],
	 	...
	 	94:[eventId99, eventId100,...],
	 	95:[eventId99, eventId100,...],
	 ]

	 result:
		[
	 	0:[{0:eventId1}],
	 	1:[{0:eventId2}, {1:eventId3},...],
	 	...
	 	94:[{0:eventId99}, {1:eventId100},...],
	 	95:[{0:eventId99}, {1:eventId100},...],
	 ]
 */
function assignColumnsToEvents(timeSlotsByEvents: string[][]): EventsGrid {
	// with this I guarantee that once a column was set for an event, it will always keep its column
	const eventColumns = new Map<string, number>();

	return timeSlotsByEvents.map((eventIds) => {
		const columnMap: Record<number, string> = {};
		eventIds.forEach((eventId) => {
			let column = eventColumns.get(eventId) ?? 0;
			while (columnMap[column] !== undefined) {
				column++;
			}
			eventColumns.set(eventId, column);
			columnMap[column] = eventId;
		});
		return columnMap;
	});
}
