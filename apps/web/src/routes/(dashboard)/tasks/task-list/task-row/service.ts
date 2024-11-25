import { format } from 'date-fns';

import type { Task } from '$lib/task/task.model';
import { editTask } from '$lib/task/task.repository';
import { getTaskDate } from '$lib/task/time-utils';

export const TASK_LIST_CLASS = 'task-list-class';
export const HANDLE = 'handle-class';

export function formatDate(task: Task, dateFormat: string) {
	const date = getTaskDate(task);
	return date ? format(date, dateFormat) : '';
}

export function startDrag(e: { target: HTMLElement }) {
	Object.assign(e.target.style, {
		touchAction: 'none',
		zIndex: '1',
	});
}

export function getDateBeneath(draggedElement: HTMLLIElement, x: number, y: number): string | void {
	draggedElement.style.visibility = 'hidden';
	const element = document.elementFromPoint(x, y);
	draggedElement.style.visibility = '';
	if (!element) return;

	const list = element.closest<HTMLUListElement>(`.${TASK_LIST_CLASS}`);
	if (!list) return;

	const { date } = list.dataset;
	return date;
}

export function moveTask(task: Task, userId: string, date: string) {
	if (task.date === date) return false;

	task.date = date;

	const { id, ...data } = task;

	void editTask(id, data, userId, null, null);
	return true;
}

export function hasMoved(
	container: HTMLLIElement,
	task: Task,
	userId: string,
	{ x, y }: { x: number; y: number },
): boolean {
	const date = getDateBeneath(container, x, y);
	if (!date) return false;

	return moveTask(task, userId, date);
}
