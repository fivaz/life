import type { EEvent, TTask } from '$lib/task/utils';
import { DATE_FR } from '$lib/utils';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { derived, writable } from 'svelte/store';

export const tasks = writable<TTask[]>([]);

function getDateName(date: Date | null): string {
	if (!date) {
		return 'Unset';
	}
	if (isToday(date)) {
		return 'Today';
	}
	if (isTomorrow(date)) {
		return 'Tomorrow';
	}
	if (isYesterday(date)) {
		return 'Yesterday';
	}
	return format(date, DATE_FR);
}

function groupToDosByDate(toDos: TTask[]): Record<string, TTask[]> {
	return toDos.reduce<Record<string, TTask[]>>((groups, toDo) => {
		const date = getDateName(toDo.startDate);

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

export const toDos = derived(tasks, ($tasks) =>
	groupToDosByDate($tasks.filter((task) => task.isDone === false)),
);

export function updateTask(newTask: TTask) {
	tasks.update(($tasks) => {
		const index = $tasks.findIndex((task) => task.id === newTask.id);
		if (index !== -1) {
			// Update existing task
			return $tasks.map((task) => (task.id === newTask.id ? newTask : task));
		} else {
			// Add new task
			return [...$tasks, newTask];
		}
	});
}

export function removeTask(task: TTask) {
	tasks.update(($tasks) => $tasks.filter((existingTask) => existingTask.id !== task.id));
}

export function toggleTask(task: TTask) {
	tasks.update(($tasks) => [
		...$tasks.filter((existingTask) => existingTask.id !== task.id),
		{ ...task, isDone: !task.isDone },
	]);
}
