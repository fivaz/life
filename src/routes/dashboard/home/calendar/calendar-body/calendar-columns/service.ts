import { weekDays } from '$lib/components/days-checkbox/service';
import type { EEvent, TTask } from '$lib/task/utils';
import { endOfDay, getDay, isSameDay, isWithinInterval, startOfDay } from 'date-fns';

function isRecurringOnDay(event: EEvent, day: Date): boolean {
	if (
		event.recurringExceptions.some((exceptionDate) => {
			return isWithinInterval(exceptionDate, {
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
			start: event.recurringStartAt as Date,
			end: event.recurringEndAt as Date,
		})
	) {
		// Check if today is one of the recurring days of the week
		const todayDayOfWeek = getDay(day);
		return event.recurringDaysOfWeek.includes(weekDays[todayDayOfWeek]);
	}
	return false;
}

export function isToDoOnDay(task: TTask, day: Date): boolean {
	return !!task.deadline && isSameDay(task.deadline, day);
}

export function isEventOnDay(event: EEvent, day: Date): boolean {
	if (event.isRecurring && event.recurringStartAt && event.recurringEndAt) {
		return isRecurringOnDay(event, day);
	}
	return (
		isWithinInterval(event.startDate, {
			start: startOfDay(day),
			end: endOfDay(day),
		}) ||
		isWithinInterval(event.endDate, {
			start: startOfDay(day),
			end: endOfDay(day),
		})
	);
}
