import { DATE_FR } from '$lib/consts';
import type { EEvent, TTask } from '$lib/task/utils';
import { format, isPast, isToday, isTomorrow, startOfWeek } from 'date-fns';
import { derived, writable } from 'svelte/store';

export const tasks = writable<TTask[]>([]);

function isCurrentWeek(date: Date) {
	return startOfWeek(new Date()).getTime() === startOfWeek(date).getTime();
}

function getDateName(date: Date | null): string {
	if (!date) {
		return 'Someday';
	}
	if (isToday(date)) {
		return 'Today';
	}
	if (isTomorrow(date)) {
		return 'Tomorrow';
	}
	if (isCurrentWeek(date)) {
		return 'This week';
	}
	if (isPast(date)) {
		return 'Overdue';
	}
	return format(date, DATE_FR);
}

function sortToDos(todos: TTask[]) {
	return todos.sort((a, b) => {
		const dateA = a.startDate || a.deadline;
		const dateB = b.startDate || b.deadline;
		if (!dateA) {
			return 1;
		}
		if (!dateB) {
			return -1;
		}
		return dateA.getTime() - dateB.getTime();
	});
}

function getToDos(tasks: TTask[]): Record<string, TTask[]> {
	const todos = tasks.filter((task) => task.isDone === false);
	const sortedTodos = sortToDos(todos);
	return groupToDosByDate(sortedTodos);
}

function groupToDosByDate(toDos: TTask[]): Record<string, TTask[]> {
	return toDos.reduce<Record<string, TTask[]>>((groups, toDo) => {
		const date = getDateName(toDo.startDate || toDo.deadline);

		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(toDo);
		return groups;
	}, {});
}

export const events = derived(
	tasks,
	($tasks) => $tasks.filter((task) => task.startDate && task.endDate) as EEvent[],
);

export const toDos = derived(tasks, ($tasks) => getToDos($tasks));

export function updateTasks(savedTasks: TTask | TTask[]) {
	if (Array.isArray(savedTasks)) {
		savedTasks.forEach((savedTask) => updateTask(savedTask));
	} else {
		updateTask(savedTasks);
	}
}

export function updateTask(task: TTask) {
	tasks.update(($tasks) => {
		const index = $tasks.findIndex((existingTask) => existingTask.id === task.id);
		if (index !== -1) {
			// Update existing task
			return $tasks.map((existingTask) => (existingTask.id === task.id ? task : existingTask));
		} else {
			// Add new task
			return [...$tasks, task];
		}
	});
}

export function removeTask(task: TTask) {
	tasks.update(($tasks) => $tasks.filter((existingTask) => existingTask.id !== task.id));
}

export function toggleEvent(task: TTask) {
	tasks.update(($tasks) => [
		...$tasks.filter((existingTask) => existingTask.id !== task.id),
		{ ...task, isDone: !task.isDone },
	]);
}
