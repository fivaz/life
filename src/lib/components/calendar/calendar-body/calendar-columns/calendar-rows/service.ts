import type { TEvent } from '$lib';
import { endOfDay, isWithinInterval, startOfDay } from 'date-fns';

export const halfHourInterval = 24 * 2;
export function isEventOnDay(event: TEvent, targetDay: Date): boolean {
	return (
		isWithinInterval(event.startDate, {
			start: startOfDay(targetDay),
			end: endOfDay(targetDay)
		}) ||
		isWithinInterval(event.endDate, { start: startOfDay(targetDay), end: endOfDay(targetDay) })
	);
}

export function getGridRows(event: TEvent): { gridRowStart: number; gridRowEnd: number } {
	// Calculate the number of 15-minute intervals from midnight for the start and end times
	const startRow =
		event.startDate.getHours() * 4 + Math.floor(event.startDate.getMinutes() / 15) + 1;
	const endRow = event.endDate.getHours() * 4 + Math.ceil(event.endDate.getMinutes() / 15) + 1;

	// Return the grid-row-start and grid-row-end values
	return {
		gridRowStart: startRow,
		gridRowEnd: endRow
	};
}
