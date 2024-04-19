import type { AnyEvent } from '$lib/task/utils';

import {
	GRID_CELL_TIME,
	GRID_CLASS,
	NEW_GRID_CELL_HEIGHT,
} from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-calendar-grid/service';
import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
import { TIME } from '$lib/consts';
import { addMinutes, format, subMinutes } from 'date-fns';

function getDateTimeFromGridCell(
	draggedElement: HTMLDivElement,
	gridCellY: number,
	gridCellX: number,
): { date: string; time: string } | void {
	draggedElement.style.visibility = 'hidden';
	const element = document.elementFromPoint(gridCellX, gridCellY);
	draggedElement.style.visibility = '';
	if (!element) return;

	const gridCell: HTMLDivElement | null = element.closest<HTMLDivElement>(`.${GRID_CLASS}`);
	if (!gridCell) return;

	const { date, time } = gridCell.dataset;
	if (!date || !time) return;

	return { date, time };
}

function getDateTimeFromLastGridCell(
	draggedElement: HTMLDivElement,
): { date: string; startTime: string } | void {
	const { bottom, height, left, width } = draggedElement.getBoundingClientRect();

	const gridCellY = bottom - NEW_GRID_CELL_HEIGHT / 2;
	const gridCellX = left + width / 2;

	const dateTime = getDateTimeFromGridCell(draggedElement, gridCellY, gridCellX);
	if (!dateTime) return;

	const [endTimeHours, endTimeMinutes] = dateTime.time.split(':').map(Number);
	// endTimeMinutes + GRID_CELL_TIME, because the last grid contains the last interval of 15 minutes,
	// so the grid itself contains 15 minutes that need to be added to find the real endTime.
	// So if the event ends at 06:00, the last grid has 05:45.
	const endTimeDate = new Date(0, 0, 0, endTimeHours, endTimeMinutes + GRID_CELL_TIME);

	const totalGrids = Math.round(height / NEW_GRID_CELL_HEIGHT);
	const totalTime = totalGrids * GRID_CELL_TIME;

	const startTimeDate = subMinutes(endTimeDate, totalTime);
	return { date: dateTime.date, startTime: format(startTimeDate, TIME) };
}

function getDateTimeFromFirstGridCell(
	draggedElement: HTMLDivElement,
): { date: string; startTime: string } | void {
	const { left, top, width } = draggedElement.getBoundingClientRect();

	const gridCellY = top + NEW_GRID_CELL_HEIGHT / 2;
	const gridCellX = left + width / 2;

	const dateTime = getDateTimeFromGridCell(draggedElement, gridCellY, gridCellX);
	if (!dateTime) return;

	return { date: dateTime.date, startTime: dateTime.time };
}

export function getDateTimeBeneath(
	draggedElement: HTMLDivElement,
): { date: string; startTime: string } | void {
	return (
		getDateTimeFromFirstGridCell(draggedElement) || getDateTimeFromLastGridCell(draggedElement)
	);
}

export function getDurationFromCellSize(height: number) {
	const numberOfFilledCells = height / NEW_GRID_CELL_HEIGHT;
	const roundedNumberOfFilledCells = Math.round(numberOfFilledCells);
	const resultDate = addMinutes(new Date(0, 0, 0), roundedNumberOfFilledCells * GRID_CELL_TIME);
	return format(resultDate, 'HH:mm');
}

export function persistChange(
	panel: HTMLDivElement,
	event: AnyEvent,
	userId: string,
	oldDate: string,
) {
	const dateTime = getDateTimeBeneath(panel);
	if (!dateTime) return;
	const duration = getDurationFromCellSize(panel.getBoundingClientRect().height);

	const { date, startTime } = dateTime;
	if (startTime === event.startTime && date === event.date && duration === event.duration)
		return false;

	event = { ...event, date, duration, startTime };
	editPossibleSingleRecurringEvent(event, userId, oldDate);
	return true;
}
