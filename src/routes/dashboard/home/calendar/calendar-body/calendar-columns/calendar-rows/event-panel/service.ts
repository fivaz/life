import type { AnyEvent } from '$lib/task/utils';

import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
import { getDurationInMinutes } from '$lib/task/utils';
import { addMinutes, format } from 'date-fns';

import { GRID_CELL_HEIGHT, GRID_CELL_TIME, isSomethingDragging } from '../calendar-grid/service';

export function isShort(event: AnyEvent) {
	return Math.abs(getDurationInMinutes(event)) <= 15;
}

export function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
	editPossibleSingleRecurringEvent({ ...event, isDone: !event.isDone }, userId, targetDate);
}

export function dragEnd(e: { target: HTMLDivElement }, event: AnyEvent, userId: string) {
	const dateTime = getCellDateTime(e.target);

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
	const dateTime = getCellDateTime(e.target);
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

export function getCellDateTime(
	draggedElement: HTMLDivElement,
): { date: string; startTime: string } | void {
	const { left, top, width } = draggedElement.getBoundingClientRect();

	const GRID_CELL_HEIGHT = 28;
	const gridCellY = top + GRID_CELL_HEIGHT / 2;
	const gridCellX = left + width / 2;

	draggedElement.style.visibility = 'hidden';
	const element = document.elementFromPoint(gridCellX, gridCellY);
	draggedElement.style.visibility = '';
	if (!element) return;

	const gridCell: HTMLDivElement | null = element.closest<HTMLDivElement>('.grid-cell');
	if (!gridCell) return;

	const date = gridCell.dataset['date'];
	const startTime = gridCell.dataset['time'];
	if (date && startTime) {
		return { date, startTime: startTime };
	}
}
