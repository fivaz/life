import { type Task } from '$lib/task/utils';

import { NUMBER_OF_CELLS } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service.svelte';
import {
	type EventsGrid,
	getEventSlots,
} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/placement-service';

import { nameOfDaysOfWeek } from '$lib/task/task-form/task-form-recurring/days-checkbox/service';
import { DATE } from '$lib/consts';
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
import { convertTimeToMinutes } from '$lib/task/time-utils';

export function getTasksForDate(tasks: Task[], date: Date): Task[] {
	return tasks.filter((task) => isForDate(task, date));
}

export function isForDate(task: Task, date: Date) {
	if (isRecurring(task)) {
		return isRecurringOnDay(task, date);
	}

	return isSameDay(parse(task.date, DATE, new Date()), date);
}

function isRecurringOnDay(event: Task, date: Date): boolean {
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
	const sortedEvents = events.toSorted(
		(a, b) => convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime),
	);

	const timeSlotsByEvents = getTimeSlots(sortedEvents);
	const columnByEvent = assignColumns(sortedEvents);
	const eventGrid: EventsGrid = Array.from({ length: 96 }, () => ({}));

	timeSlotsByEvents.forEach((eventIds, timeSlot) => {
		eventIds.forEach((eventId) => {
			const column = columnByEvent[eventId];
			eventGrid[timeSlot][column] = eventId;
		});
	});
	return eventGrid;

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
		const timeSlots = new Array(NUMBER_OF_CELLS).fill(null).map<string[]>(() => []);

		for (const event of events) {
			const { endSlot, startSlot } = getEventSlots(event);
			for (let i = startSlot; i < endSlot; i++) {
				timeSlots[i].push(event.id);
			}
		}

		return timeSlots;
	}

	/**
	 Convert a list of events into an Object in which the keys are events ids and the values are the colum in which the event should start its placement,
	 events can spread to other columns if they exist. So in case there two events take place at the same moment one will start at the column 0
	 and the other at column 1 but if there is only one event at a certain moment it will also be placed at column 0

	 [
	 	eventId1:0,
	 	eventId2:1,
	  eventId3:0,
	 	eventId4:0,
	  eventId5:1,
	  ...
	 ]

	 this is used to guarantee that if two events are taking place simultaneously they will never occupy the same column
	 */
	function assignColumns(events: Task[]): Record<string, number> {
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
}
