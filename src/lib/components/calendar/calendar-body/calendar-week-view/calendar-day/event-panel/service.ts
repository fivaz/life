import { addMinutes, subMinutes } from 'date-fns';

import {
	GRID_CELL_HEIGHT,
	GRID_CELL_TIME,
	GRID_CLASS,
} from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
import { EVENT_PANEL_CLASS } from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/event-panel/placement-service';
import type { HHmm, yyyyMMdd } from '$lib/date.utils.svelte';
import { formatTime } from '$lib/date.utils.svelte';
import type { Task } from '$lib/task/task.model';
import { getDurationInMinutes } from '$lib/task/task.utils';

function getElementBeneath(draggedElement: HTMLElement, gridCellY: number, gridCellX: number) {
	draggedElement.style.visibility = 'hidden';
	const element = document.elementFromPoint(gridCellX, gridCellY);
	draggedElement.style.visibility = '';
	return element;
}

function getGridCellBeneath(draggedElement: HTMLDivElement, gridCellY: number, gridCellX: number) {
	const element = getElementBeneath(draggedElement, gridCellY, gridCellX);
	if (!element) return;

	const gridCell = element.closest<HTMLDivElement>(`.${GRID_CLASS}`);
	if (gridCell) return gridCell;

	const eventPanel = element.closest<HTMLDivElement>(`.${EVENT_PANEL_CLASS}`);
	if (!eventPanel) return;

	// if I need to get the element beneath eventPanel I need to first hide the draggedElement, otherwise I'll retrieve it
	draggedElement.style.visibility = 'hidden';
	const elementBeneath = getElementBeneath(eventPanel, gridCellY, gridCellX);
	draggedElement.style.visibility = '';

	if (!elementBeneath) return;
	return elementBeneath.closest<HTMLDivElement>(`.${GRID_CLASS}`);
}

function getDateTimeFromGridCell(
	draggedElement: HTMLDivElement,
	gridCellY: number,
	gridCellX: number,
): { date: string; time: string } | void {
	const gridCell = getGridCellBeneath(draggedElement, gridCellY, gridCellX);

	if (!gridCell) return;

	const { date, time } = gridCell.dataset;
	if (!date || !time) return;

	return { date, time };
}

function getDateTimeFromLastGridCell(
	draggedElement: HTMLDivElement,
): { date: string; startTime: string } | void {
	const { bottom, height, left, width } = draggedElement.getBoundingClientRect();

	const gridCellY = bottom - GRID_CELL_HEIGHT / 2;
	const gridCellX = left + width / 2;

	const dateTime = getDateTimeFromGridCell(draggedElement, gridCellY, gridCellX);
	if (!dateTime) return;

	const [endTimeHours, endTimeMinutes] = dateTime.time.split(':').map(Number);
	// endTimeMinutes + GRID_CELL_TIME, because the last grid contains the last interval of 15 minutes,
	// so the grid itself contains 15 minutes that need to be added to find the real endTime.
	// So if the event ends at 06:00, the last grid has 05:45.
	const endTimeDate = new Date(0, 0, 0, endTimeHours, endTimeMinutes + GRID_CELL_TIME);

	const totalGrids = Math.round(height / GRID_CELL_HEIGHT);
	const totalTime = totalGrids * GRID_CELL_TIME;

	const startTimeDate = subMinutes(endTimeDate, totalTime);
	return { date: dateTime.date, startTime: formatTime(startTimeDate) };
}

function getDateTimeFromFirstGridCell(
	draggedElement: HTMLDivElement,
): { date: string; startTime: string } | void {
	const { left, top, width } = draggedElement.getBoundingClientRect();

	const gridCellY = top + GRID_CELL_HEIGHT / 2;
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
	const numberOfFilledCells = height / GRID_CELL_HEIGHT;
	const roundedNumberOfFilledCells = Math.round(numberOfFilledCells);
	const resultDate = addMinutes(new Date(0, 0, 0), roundedNumberOfFilledCells * GRID_CELL_TIME);
	return formatTime(resultDate);
}

export function getCellSizeFromDuration(event: Task) {
	const numberOfFilledCells = getDurationInMinutes(event) / GRID_CELL_TIME;
	const roundedNumberOfFilledCells = Math.round(numberOfFilledCells);
	return roundedNumberOfFilledCells * GRID_CELL_HEIGHT;
}

export function hasMoved(
	panel: HTMLDivElement,
	event: Task,
): { date: yyyyMMdd; duration: HHmm; startTime: HHmm } | false {
	const dateTime = getDateTimeBeneath(panel) as void | { date: yyyyMMdd; startTime: HHmm };
	if (!dateTime) return false;
	const duration = getDurationFromCellSize(panel.getBoundingClientRect().height);

	const { date, startTime } = dateTime;
	if (startTime === event.startTime && date === event.date && duration === event.duration)
		return false;

	return { date, duration, startTime };
}
