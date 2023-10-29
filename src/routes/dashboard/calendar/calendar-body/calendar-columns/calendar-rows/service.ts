import type { EEvent } from '$lib/event/utils';

export const halfHourInterval = 24 * 2;

function getGridRows(event: EEvent): { start: number; end: number } {
	// Calculate the number of 15-minute intervals from midnight for the start and end times
	const start = event.startDate.getHours() * 4 + Math.floor(event.startDate.getMinutes() / 15) + 1;
	const end = event.endDate.getHours() * 4 + Math.ceil(event.endDate.getMinutes() / 15) + 1;

	// Return the grid-row-start and grid-row-end values
	return { start, end };
}

export function getGridRowsStyle(event: EEvent) {
	const { start, end } = getGridRows(event);
	return `grid-row: ${start} / ${end};`;
}
