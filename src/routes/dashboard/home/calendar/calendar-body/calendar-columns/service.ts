import { weekDays } from '$lib/components/days-checkbox/service';
import { DATE, DATETIME } from '$lib/consts';
import type { Event, RecurringEvent, ToDo } from '$lib/task/utils';
import { endOfDay, getDay, isSameDay, isWithinInterval, parse, startOfDay } from 'date-fns';

function isRecurringOnDay(event: RecurringEvent, day: Date): boolean {
	if (
		event.recurringExceptions.some((exceptionDate) => {
			return isWithinInterval(parse(exceptionDate, DATE, new Date()), {
				start: startOfDay(day),
				end: endOfDay(day),
			});
		})
	) {
		return false;
	}
	if (
		// don't forget to always put this inside an if to check recurringStartAt and recurringEndAt
		isWithinInterval(day, {
			start: parse(event.recurringStartAt, DATE, new Date()),
			end: parse(event.recurringEndAt, DATE, new Date()),
		})
	) {
		// Check if today is one of the recurring days of the week
		const todayDayOfWeek = getDay(day);
		return event.recurringDaysOfWeek.includes(weekDays[todayDayOfWeek]);
	}
	return false;
}

export function isToDoOnDay(task: ToDo, day: Date): boolean {
	return !!task.deadline && isSameDay(parse(task.deadline, DATE, new Date()), day);
}

export function isEventOnDay(event: Event | RecurringEvent, day: Date): boolean {
	if ('recurringStartAt' in event && event.recurringStartAt) {
		console.log(event);
		return isRecurringOnDay(event as RecurringEvent, day);
	}

	const startDateString = `${event.date} ${event.startTime}`;
	const endDateString = `${event.date} ${event.endTime}`;

	const startDate = parse(startDateString, DATETIME, new Date());
	const endDate = parse(endDateString, DATETIME, new Date());

	return (
		isWithinInterval(startDate, {
			start: startOfDay(day),
			end: endOfDay(day),
		}) ||
		isWithinInterval(endDate, {
			start: startOfDay(day),
			end: endOfDay(day),
		})
	);
}
