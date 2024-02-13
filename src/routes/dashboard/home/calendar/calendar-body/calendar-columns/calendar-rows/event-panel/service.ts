import type { AnyEvent } from '$lib/task/utils';

import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
import { TIME } from '$lib/consts';
import { getDurationInMinutes } from '$lib/task/utils';
import { addMinutes, format, subMinutes } from 'date-fns';

import { GRID_CELL_HEIGHT, GRID_CELL_TIME, isSomethingDragging } from '../calendar-grid/service';

export function isShort(event: AnyEvent) {
	return Math.abs(getDurationInMinutes(event)) <= 15;
}

export function persistChange(
	panel: HTMLDivElement,
	event: AnyEvent,
	userId: string,
	oldDate: string,
) {
	console.log('persistChange');
	const dateTime = getGridCellDateTime(panel);
	if (!dateTime) return;
	console.log('dateTime', dateTime);
	const duration = getDurationFromCellSize(panel.getBoundingClientRect().height);
	console.log(duration);

	const { date, startTime } = dateTime;
	if (startTime === event.startTime && date === event.date && duration === event.duration)
		return false;

	event = { ...event, date, duration, startTime };
	editPossibleSingleRecurringEvent(event, userId, oldDate);
	return true;
}

export function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
	editPossibleSingleRecurringEvent({ ...event, isDone: !event.isDone }, userId, targetDate);
}

export function dragEnd(e: { target: HTMLDivElement }, event: AnyEvent, userId: string) {
	const dateTime = getGridCellDateTime(e.target);

	if (!dateTime || (dateTime.startTime === event.startTime && dateTime.date === event.date)) return;

	event = { ...event, date: dateTime.date, startTime: dateTime.startTime };
	editPossibleSingleRecurringEvent(event, userId, dateTime.date);

	isSomethingDragging.set(false);
}

export function persisteNewSize(
	e: { rect: { height: number }; target: HTMLDivElement },
	event: AnyEvent,
	userId: string,
	targetDate: string,
) {
	console.log('e.rect.height', e.rect.height);
	console.log('e.target', e.target.getBoundingClientRect().height);
	const dateTime = getGridCellDateTime(e.target);
	const duration = getDurationFromCellSize(e.rect.height);

	if (!dateTime || (dateTime.startTime === event.startTime && duration === event.duration)) return;

	event = { ...event, duration, startTime: dateTime.startTime };
	editPossibleSingleRecurringEvent(event, userId, targetDate);

	isSomethingDragging.set(false);
}

export function getDurationFromCellSize(height: number) {
	const timeIntervals = height / GRID_CELL_HEIGHT;
	const timeIntervalRounded = Math.round(timeIntervals);
	const resultDate = addMinutes(new Date(0, 0, 0), timeIntervalRounded * GRID_CELL_TIME);
	return format(resultDate, 'HH:mm');
}

function getFirstGridCell(draggedElement: HTMLDivElement): HTMLDivElement | null {
	const { left, top, width } = draggedElement.getBoundingClientRect();

	const GRID_CELL_HEIGHT = 28;
	const gridCellY = top + GRID_CELL_HEIGHT / 2;
	const gridCellX = left + width / 2;

	draggedElement.style.visibility = 'hidden';
	const element = document.elementFromPoint(gridCellX, gridCellY);
	draggedElement.style.visibility = '';
	if (!element) return null;

	const gridCell: HTMLDivElement | null = element.closest<HTMLDivElement>('.grid-cell');
	if (!gridCell) return null;

	return gridCell;
}

function getLastGridCell(draggedElement: HTMLDivElement): HTMLDivElement | void {
	const { bottom, left, width } = draggedElement.getBoundingClientRect();

	const GRID_CELL_HEIGHT = 28;
	const gridCellY = bottom - GRID_CELL_HEIGHT / 2;
	const gridCellX = left + width / 2;

	draggedElement.style.visibility = 'hidden';
	const element = document.elementFromPoint(gridCellX, gridCellY);
	draggedElement.style.visibility = '';
	if (!element) return;

	const gridCell: HTMLDivElement | null = element.closest<HTMLDivElement>('.grid-cell');
	if (!gridCell) return;

	return gridCell;
}

export function getGridCellDateTime(
	draggedElement: HTMLDivElement,
): { date: string; startTime: string } | void {
	const firstCell = getFirstGridCell(draggedElement);

	if (firstCell) {
		const date = firstCell.dataset['date'];
		const startTime = firstCell.dataset['time'];
		if (date && startTime) {
			return { date, startTime };
		}
	}

	const lastCell = getLastGridCell(draggedElement);
	const { height } = draggedElement.getBoundingClientRect();

	if (lastCell) {
		const date = lastCell.dataset['date'];
		const endTime = lastCell.dataset['time'];
		if (!date || !endTime) return;
		const [endTimeHours, endTimeMinutes] = endTime.split(':').map(Number);
		// + GRID_CELL_TIME, because the last grid contains the last slot of 15 minutes, so the slot itself contains 15 minutes
		// that need to be added to find the real endTime. So if the event ends at 06:00, the last grid in it is the grid containing 05:45.
		const endTimeDate = new Date(0, 0, 0, endTimeHours, endTimeMinutes + GRID_CELL_TIME);

		const totalGrids = Math.round(height / GRID_CELL_HEIGHT);
		const totalTime = totalGrids * GRID_CELL_TIME;

		const startTimeDate = subMinutes(endTimeDate, totalTime);
		return { date, startTime: format(startTimeDate, TIME) };
	}
}
