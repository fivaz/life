import {
	GRID_CELL_TIME,
	NEW_GRID_CELL_HEIGHT,
} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
import { convertTimeToMinutes } from '$lib/task/time-utils';
import { type AnyEvent } from '$lib/task/utils';

export const EVENT_PANEL_CLASS = 'event-panel-class';

export function getSlot(date: string) {
	return convertTimeToMinutes(date) / GRID_CELL_TIME;
}

export function getStartSlot(event: AnyEvent) {
	return getSlot(event.startTime);
}

export function getEndSlot(event: AnyEvent) {
	return getSlot(event.startTime) + getSlot(event.duration);
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
	const durationMinutes = convertTimeToMinutes(event.duration);

	return `height: ${(durationMinutes / GRID_CELL_TIME) * NEW_GRID_CELL_HEIGHT}px;`;
}

export function getTop(event: AnyEvent): string {
	const startTimeMinutes = convertTimeToMinutes(event.startTime);

	return `top: ${(startTimeMinutes / GRID_CELL_TIME) * NEW_GRID_CELL_HEIGHT}px;`;
}
