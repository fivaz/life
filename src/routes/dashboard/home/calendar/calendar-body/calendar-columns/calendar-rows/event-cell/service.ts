import type { AnyEvent, Event } from '$lib/task/utils';

import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
import { getDuration } from '$lib/task/utils';

export function isShort(event: Event) {
	return Math.abs(getDuration(event)) <= 15;
}

export function toggleCompletion(userId: string, event: AnyEvent, targetDate: string) {
	const newEvent = { ...event, isDone: !event.isDone };
	const { id, ...data } = newEvent;
	editPossibleSingleRecurringEvent(id, data, userId, targetDate);
}

export function getCellDateTime(
	draggedElement: HTMLDivElement,
): { date: string; time: string } | void {
	const { left, top, width } = draggedElement.getBoundingClientRect();

	const GRID_CELL_HEIGHT = 28;
	const yPoint = top + GRID_CELL_HEIGHT / 2;
	const xPoint = left + width / 2;

	draggedElement.style.visibility = 'hidden';
	const gridCell = document.elementFromPoint(xPoint, yPoint);
	draggedElement.style.visibility = '';

	if (gridCell instanceof HTMLElement) {
		const date = gridCell.dataset['date'];
		const time = gridCell.dataset['time'];
		if (date && time) {
			return { date, time };
		}
	}
}
