import type { Event } from '$lib/task/utils';

import { getEndTime } from '$lib/components/task-form/service';

export const halfHourInterval = 24 * 2;

function getGridRows(event: Event): { end: number; start: number } {
	const [startHours, startMinutes] = event.startTime.split(':').map(Number);
	const [endHours, endMinutes] = getEndTime(event.startTime, event.duration).split(':').map(Number);

	// Calculate the number of 15-minute intervals from midnight for the start and end times
	const start = startHours * 4 + Math.floor(startMinutes / 15) + 1;
	const end = endHours * 4 + Math.ceil(endMinutes / 15) + 1;

	// Return the grid-row-start and grid-row-end values
	return { end, start };
}

export function getGridRowsStyle(event: Event) {
	const { end, start } = getGridRows(event);
	return `grid-row: ${start} / ${end};`;
}
