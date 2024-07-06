import {
	GRID_CELL_HEIGHT,
	GRID_CELL_TIME,
	NUMBER_OF_CELLS,
} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
import { convertTimeToMinutes } from '$lib/task/time-utils';
import { type AnyEvent } from '$lib/task/utils';

export const EVENT_PANEL_CLASS = 'event-panel-class';

export function getSlot(date: string) {
	return Math.round(convertTimeToMinutes(date) / GRID_CELL_TIME);
}

export function getStartSlot(event: AnyEvent) {
	return getSlot(event.startTime);
}

export function getEndSlot(event: AnyEvent) {
	const endSlot = getSlot(event.startTime) + getSlot(event.duration);
	if (endSlot > NUMBER_OF_CELLS) {
		return NUMBER_OF_CELLS;
	}

	return endSlot;
}

export function getDivision(timeSlots: string[][], event: AnyEvent) {
	const startSlot = getStartSlot(event);
	const endSlot = getEndSlot(event);

	let biggestOverlapIndex = startSlot;
	for (let i = startSlot; i < endSlot; i++) {
		if (timeSlots[i].length > timeSlots[biggestOverlapIndex].length) {
			biggestOverlapIndex = i;
		}
	}

	const biggestOverlap = timeSlots[biggestOverlapIndex].length;
	const width = 100 / biggestOverlap;

	const left = width * timeSlots[biggestOverlapIndex].indexOf(event.id);

	return `width: ${width}%; left: ${left}%;`;
}

export function getHeight(event: AnyEvent) {
	const startSlot = getStartSlot(event);
	const endSlot = getEndSlot(event);
	// the duration is calculated like this instead of just event.duration to sanitize the duration in case it overlaps 24h
	const duration = endSlot - startSlot;

	return `height: ${duration * GRID_CELL_HEIGHT}px;`;
}

export function getTop(event: AnyEvent): string {
	const startTimeMinutes = convertTimeToMinutes(event.startTime);

	return `top: ${(startTimeMinutes / GRID_CELL_TIME) * GRID_CELL_HEIGHT}px;`;
}

export function arrangeEvents(events: AnyEvent[]): { css: string; event: AnyEvent }[] {
	// Sort events by start time
	events.sort((a, b) => convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime));

	// Track the number of overlaps for each timeslot
	const timeSlots = new Array(NUMBER_OF_CELLS).fill(0);
	events.forEach((event) => {
		const startSlot = getStartSlot(event);
		const endSlot = getEndSlot(event);
		for (let i = startSlot; i < endSlot; i++) {
			timeSlots[i]++;
		}
	});

	// Track the columns and their end times
	const columnEndTimes: number[] = [];
	const eventColumns: Record<string, number> = {};

	for (const event of events) {
		const startSlot = getStartSlot(event);
		const endSlot = getEndSlot(event);

		let column = 0;
		while (column < columnEndTimes.length && columnEndTimes[column] > startSlot) {
			column++;
		}

		eventColumns[event.id] = column;
		columnEndTimes[column] = endSlot;
	}

	// Assign width and left styles
	return events.map((event) => {
		const column = eventColumns[event.id];
		const startSlot = getStartSlot(event);
		const maxOverlaps = Math.max(...timeSlots.slice(startSlot, getEndSlot(event)));
		const totalColumns = maxOverlaps > 1 ? maxOverlaps : 1;
		const width = totalColumns === 1 ? 100 : 100 / totalColumns;
		const left = totalColumns === 1 ? 0 : width * column;

		const css = `position: absolute; width: ${width}%; left: ${left}%; ${getHeight(event)}; ${getTop(event)};`;
		return { css, event };
	});
}
