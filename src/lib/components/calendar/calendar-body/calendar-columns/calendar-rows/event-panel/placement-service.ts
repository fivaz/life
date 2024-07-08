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

export function getEventSlots(event: AnyEvent): { endSlot: number; startSlot: number } {
	const startSlot = getSlot(event.startTime);
	let endSlot = startSlot + getSlot(event.duration);
	if (endSlot > NUMBER_OF_CELLS) {
		endSlot = NUMBER_OF_CELLS;
	}

	return { endSlot, startSlot };
}

export function getDivision(
	event: AnyEvent,
	eventColumns: Record<string, number>,
	timeSlots: number[],
) {
	const column = eventColumns[event.id];
	const { endSlot, startSlot } = getEventSlots(event);
	const maxOverlaps = Math.max(...timeSlots.slice(startSlot, endSlot));
	const totalColumns = maxOverlaps > 1 ? maxOverlaps : 1;
	const width = totalColumns === 1 ? 100 : 100 / totalColumns;
	const left = totalColumns === 1 ? 0 : width * column;

	return `width: ${width}%; left: ${left}%;`;
}

export function getHeight(event: AnyEvent) {
	const { endSlot, startSlot } = getEventSlots(event);
	// the duration is calculated like this instead of just event.duration to sanitize the duration in case it overlaps 24h
	const duration = endSlot - startSlot;

	return `height: ${duration * GRID_CELL_HEIGHT}px;`;
}

export function getTop(event: AnyEvent): string {
	const startTimeMinutes = convertTimeToMinutes(event.startTime);

	return `top: ${(startTimeMinutes / GRID_CELL_TIME) * GRID_CELL_HEIGHT}px;`;
}
