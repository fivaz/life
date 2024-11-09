import { type AnyTimedTask, type RecurringTimedTask, type Task } from '$lib/task/utils';

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

export function getTasksForDate(tasks: Task[], date: Date): Task[] {
	return tasks.filter((task) => isForDate(task, date));
}

export function isForDate(task: Task, date: Date) {
	if (isRecurring(task)) {
		return isRecurringOnDay(task, date);
	}

	return isSameDay(parse(task.date, DATE, new Date()), date);
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

	/**
	 convert a list of events from:

	 [event1, event2,...]

	 into a hashmap of events ids in which each hash represent 15 minutes like:

	 [
	 	0:[eventId1, eventId2,...],
	 	1:[eventId2, eventId3,...],
	 	...
	 	95:[eventId97, eventId98,...],
	 	96:[eventId99, eventId100,...],
	 ]
	 */
	function getTimeSlots(events: AnyTimedTask[]): string[][] {
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
	 Convert a list of events from:

	 [event1, event2,...]

	 into an Object in which the keys are events Ids and the values are the position of each event:

	 [
	 	eventId1:0,
	 	eventId2:1,
	  eventId3:0,
	 	eventId4:0,
	  eventId5:1,
	  ...
	 ]

	 this is used so then we can know each how many events can be fit in the same time grid but in different columns
	 */
	function assignColumns(events: AnyTimedTask[]): Record<string, number> {
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
