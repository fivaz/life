import { weekDays } from '$lib/components/days-checkbox/service';
import { DATE, DATETIME } from '$lib/consts';
import type { AnyTask, RecurringEvent } from '$lib/task/utils';
import { endOfDay, getDay, isSameDay, isWithinInterval, parse, startOfDay } from 'date-fns';

function isRecurringOnDay(event: RecurringEvent, day: Date): boolean {
	if (
		event.recurringExceptions &&
		event.recurringExceptions.split(', ').some((exceptionDate) => {
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
		const endDateString = `${task.date} ${task.endTime}`;

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

	return false;
}
