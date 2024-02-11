import type { AnyEvent } from '$lib/task/utils';

import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
import { convertDurationToMinutes } from '$lib/task/utils';

import { GRID_CELL_HEIGHT } from '../calendar-grid/service';

export function isShort(event: AnyEvent) {
	return Math.abs(convertDurationToMinutes(event)) <= 15;
}

export function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
	editPossibleSingleRecurringEvent({ ...event, isDone: !event.isDone }, userId, targetDate);
}

export function getCellDateTime(draggedElement: HTMLDivElement): {
	date: string;
	startTime: string;
} {
	const { left, top, width } = draggedElement.getBoundingClientRect();

	const gridCellY = top + GRID_CELL_HEIGHT / 2;
	const gridCellX = left + width / 2;

	draggedElement.style.visibility = 'hidden';
	const element = document.elementFromPoint(gridCellX, gridCellY);
	draggedElement.style.visibility = '';
	if (!element) throw Error("getCellDateTime - element doesn't exist");

	const gridCell: HTMLDivElement | null = element.closest<HTMLDivElement>('.grid-cell');
	if (!gridCell) throw Error("getCellDateTime - gridCell doesn't exist");

	const date = gridCell.dataset['date'];
	const startTime = gridCell.dataset['time'];
	if (date && startTime) {
		return { date, startTime };
	}

	throw Error("getCellDateTime - date or time doesn't exist");
}
