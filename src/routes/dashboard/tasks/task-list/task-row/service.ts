import { editTask } from '$lib/components/task-form/service';
import { DATE } from '$lib/consts';
import { getTaskDate } from '$lib/task/time-utils';
import { type AnyTask, isToDo } from '$lib/task/utils';
import { addDays, addWeeks, format, lastDayOfWeek } from 'date-fns';

import { GROUPS } from '../../service';

export const TASK_LIST_CLASS = 'task-list-class';
export const HANDLE = 'handle-class';

export function formatDate(task: AnyTask, dateFormat: string) {
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

export function getLiteralDate(date: string): string {
	if (date === GROUPS.Today) {
		return format(new Date(), DATE);
	}
	if (date === GROUPS.Tomorrow) {
		return format(addDays(new Date(), 1), DATE);
	}
	if (date === GROUPS.Week) {
		return format(lastDayOfWeek(new Date()), DATE);
	}
	if (date === GROUPS.NextWeek) {
		return format(lastDayOfWeek(addWeeks(new Date(), 1)), DATE);
	}
	if (date === GROUPS.Someday) {
		return '';
	}
	return date;
}

export function moveTask(task: AnyTask, userId: string, date: string) {
	if (isToDo(task)) {
		if (task.deadline === date) return false;
		task.deadline = date;
	} else {
		if (task.date === date) return false;
		task.date = date;
	}
	const { id, ...data } = task;
	void editTask(id, data, userId, null, null);
	return true;
}

export function hasMoved(
	container: HTMLLIElement,
	task: AnyTask,
	userId: string,
	{ x, y }: { x: number; y: number },
): boolean {
	const date = getDateBeneath(container, x, y);
	if (!date) return false;

	const literalDate = getLiteralDate(date);

	return moveTask(task, userId, literalDate);
}
