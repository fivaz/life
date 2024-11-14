import {
	GRID_CELL_HEIGHT,
	GRID_CELL_TIME,
	NUMBER_OF_CELLS,
} from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
import { convertTimeToMinutes } from '$lib/task/time-utils';
import { type TimedTask } from '$lib/task/utils';

export const EVENT_PANEL_CLASS = 'event-panel-class';

export function getSlot(date: string) {
	return Math.round(convertTimeToMinutes(date) / GRID_CELL_TIME);
}

export function getEventSlots(event: TimedTask): { endSlot: number; startSlot: number } {
	const startSlot = getSlot(event.startTime);
	let endSlot = startSlot + getSlot(event.duration);
	if (endSlot > NUMBER_OF_CELLS) {
		endSlot = NUMBER_OF_CELLS;
	}

	return { endSlot, startSlot };
}

export type EventsGrid = { [column: number]: string }[];

function getMaxOverlap(eventGrid: EventsGrid) {
	const overlapList = eventGrid.map((eventsObject) => Object.keys(eventsObject).length);
	return Math.max(...overlapList);
}

function getColumn(eventIdToFind: string, eventGrid: EventsGrid[0]) {
	// it gets the key in the object whose value is the eventIdToFind
	const column = Object.keys(eventGrid).find((key) => eventGrid[Number(key)] === eventIdToFind);
	if (!column) {
		console.error(
			`Internal Error, the eventId: ${eventIdToFind} can't be found in the eventGrid ${eventGrid}`,
		);
	}
	return Number(column);
}

export function getDivision(event: TimedTask, eventsGrid: EventsGrid) {
	const { endSlot, startSlot } = getEventSlots(event);
	const eventGrid = eventsGrid.slice(startSlot, endSlot);
	const maxOverlap = getMaxOverlap(eventGrid);

	if (maxOverlap <= 1) {
		return 'width: 100%; left: 0%;';
	}

	const column = getColumn(event.id, eventGrid[0]);

	const width = 100 / maxOverlap;
	const left = width * column;

	return `width: ${width}%; left: ${left}%;`;
}

export function getHeight(event: TimedTask) {
	const { endSlot, startSlot } = getEventSlots(event);
	// the duration is calculated like this instead of just event.duration to sanitize the duration in case it overlaps 24h
	const duration = endSlot - startSlot;

	return `height: ${duration * GRID_CELL_HEIGHT}px;`;
}

export function getTop(event: TimedTask): string {
	const startTimeMinutes = convertTimeToMinutes(event.startTime);

	return `top: ${(startTimeMinutes / GRID_CELL_TIME) * GRID_CELL_HEIGHT}px;`;
}
