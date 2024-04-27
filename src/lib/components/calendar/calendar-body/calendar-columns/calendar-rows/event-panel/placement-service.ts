import {
	GRID_CELL_TIME,
	NEW_GRID_CELL_HEIGHT,
} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
import { type AnyEvent, convertTimeToMinutes } from '$lib/task/utils';

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

	let biggestOverLapping = Number.NEGATIVE_INFINITY;
	for (let i = startSlot; i < endSlot; i++) {
		if (timeSlots[i].length > biggestOverLapping) {
			biggestOverLapping = timeSlots[i].length;
		}
	}

	return `width: ${100 / biggestOverLapping}%;`;
}

export function getLeft(timeSlots: string[][], event: AnyEvent) {
	const startSlot = getStartSlot(event);
	const endSlot = getEndSlot(event);

	let biggestOverlapIndex = startSlot;
	for (let i = startSlot; i < endSlot; i++) {
		if (timeSlots[i].length > timeSlots[biggestOverlapIndex].length) {
			biggestOverlapIndex = i;
		}
	}

	const biggestOverlap = timeSlots[biggestOverlapIndex].length;
	const position = (100 / biggestOverlap) * timeSlots[biggestOverlapIndex].indexOf(event.id);

	return `left: ${position}%;`;
}

export function getHeight(event: AnyEvent) {
	const durationMinutes = convertTimeToMinutes(event.duration);

	return `height: ${(durationMinutes / GRID_CELL_TIME) * NEW_GRID_CELL_HEIGHT}px;`;
}

export function getTop(event: AnyEvent): string {
	const startTimeMinutes = convertTimeToMinutes(event.duration);

	return `top: ${(startTimeMinutes / GRID_CELL_TIME) * NEW_GRID_CELL_HEIGHT}px;`;
}
