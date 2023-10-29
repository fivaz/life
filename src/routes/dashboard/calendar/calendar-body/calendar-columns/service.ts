import type { EEvent } from '$lib/event/utils';
import { endOfDay, isWithinInterval, startOfDay } from 'date-fns';

export function isEventOnDay(event: EEvent, targetDay: Date): boolean {
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
