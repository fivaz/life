import { weekDays } from '$lib/components/days-checkbox/service';
import type { TTask } from '$lib/task/utils';
import { endOfDay, getDay, isWithinInterval, startOfDay } from 'date-fns';

export function isEventOnDay(event: TTask, targetDay: Date): boolean {
	if (event.isRecurring && event.recurringStartAt && event.recurringEndAt) {
		if (isWithinInterval(targetDay, { start: event.recurringStartAt, end: event.recurringEndAt })) {
			// Check if today is one of the recurring days of the week
			const todayDayOfWeek = getDay(targetDay);
			return event.recurringDaysOfWeek.includes(weekDays[todayDayOfWeek]);
		}
		return false;
	}

	return (
		isWithinInterval(event.startDate, {
			start: startOfDay(targetDay),
			end: endOfDay(targetDay),
		}) ||
		isWithinInterval(event.endDate, {
			start: startOfDay(targetDay),
			end: endOfDay(targetDay),
		})
	);
}
