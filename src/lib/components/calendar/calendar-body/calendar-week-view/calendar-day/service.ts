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

import { NUMBER_OF_CELLS } from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
import {
	type EventsGrid,
	getEventSlots,
} from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/event-panel/placement-service';
import { DATE } from '$lib/consts';
import {
	type CalendarTask,
	isRecurring,
	type RecurringTask,
	type Task,
	type TimedTask,
} from '$lib/task/task.model';
import { sortTasks } from '$lib/task/task.utils';
import { nameOfDaysOfWeek } from '$lib/task/task-form/task-form-recurring/days-checkbox/service';

export function getTasksForDate(tasks: Task[], date: Date): CalendarTask[] {
	return tasks.filter((task) => isForDate(task, date));
}

export function isForDate(task: Task, date: Date): task is CalendarTask {
	if (!task.date) return false;

	if (isRecurring(task)) {
		return isRecurringOnDay(task, date);
	}

	return isSameDay(parse(task.date, DATE, new Date()), date);
}

function isRecurringOnDay(event: RecurringTask, date: Date): boolean {
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

	function isDateAnException(event: RecurringTask, date: Date): boolean {
		return event.recurringExceptions.some((exceptionDate) => {
			return isWithinInterval(parse(exceptionDate, DATE, new Date()), {
				end: endOfDay(date),
				start: startOfDay(date),
			});
		});
	}

	function isDailyRecurringOnDay(event: RecurringTask, date: Date): boolean {
		// Check if today is one of the recurring days of the week
		const dayOfWeek = getDay(date);
		return event.recurringDaysOfWeek.includes(nameOfDaysOfWeek[dayOfWeek]);
	}

	function isWeeklyRecurringOnDay(event: RecurringTask, date: Date): boolean {
		return getDay(event.date) === getDay(date);
	}

	function isMonthlyRecurringOnDay(event: RecurringTask, date: Date): boolean {
		return getDate(event.date) === getDate(date);
	}

	function isYearlyRecurringOnDay(event: RecurringTask, date: Date): boolean {
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
export function getEventGrid(events: TimedTask[]): EventsGrid {
	// the algorithm only works if events are sorted by time
	const sortedEvents = sortTasks(events);

	const timeSlotsByEvents = getTimeSlots(sortedEvents);

	return assignColumnsToEvents(timeSlotsByEvents);

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
	function getTimeSlots(events: TimedTask[]): string[][] {
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
		const eventColumns = new Map<string, number>();

		return timeSlotsByEvents.map((eventIds) => {
			return eventIds.reduce<Record<number, string>>((object, eventId, index) => {
				// with this I guarantee that once a column was set for an event, it will always keep its column
				if (!eventColumns.has(eventId)) {
					eventColumns.set(eventId, index);
				}
				const column = eventColumns.get(eventId)!;
				object[column] = eventId;
				return object;
			}, {});
		});
	}
}
