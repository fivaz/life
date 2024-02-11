import type { AnyEvent } from '$lib/task/utils';

import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
import { getDurationInMinutes } from '$lib/task/utils';

export function isShort(event: AnyEvent) {
	return Math.abs(getDurationInMinutes(event)) <= 15;
}

export function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
	editPossibleSingleRecurringEvent({ ...event, isDone: !event.isDone }, userId, targetDate);
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
