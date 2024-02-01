import { DATE, DATE_FR } from '$lib/consts';
import type { EEvent, Task } from '$lib/task/utils';
import { format, isPast, isToday, isTomorrow, parse, parseISO, startOfWeek } from 'date-fns';
import { derived, writable } from 'svelte/store';

export const tasks = writable<Task[]>([]);

function isCurrentWeek(date: Date) {
	return startOfWeek(new Date()).getTime() === startOfWeek(date).getTime();
}

function getDateName(task: Task): string {
	const date = parse('date' in task ? task.date : task.deadline, DATE, new Date());

	if ('recurringStartAt' in task) {
		return 'Recurring';
	}

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

function sortToDos(todos: Task[]) {
	return todos.sort((a, b) => {
		const dateA = parse('date' in a ? a.date : a.deadline, DATE, new Date());
		const dateB = parse('date' in b ? b.date : b.deadline, DATE, new Date());
		if (!dateA) {
			return 1;
		}
		if (!dateB) {
			return -1;
		}
		return dateA.getTime() - dateB.getTime();
	});
}

export function getToDos(tasks: Task[]): Record<string, Task[]> {
	const sortedTodos = sortToDos(tasks);
	return groupToDosByDate(sortedTodos);
}

function groupToDosByDate(toDos: Task[]): Record<string, Task[]> {
	return toDos.reduce<Record<string, Task[]>>((groups, toDo) => {
		const date = getDateName(toDo);

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

export const groupedToDos = derived(tasks, ($tasks) => getToDos($tasks));

export function updateTasks(savedTasks: Task | Task[]) {
	if (Array.isArray(savedTasks)) {
		savedTasks.forEach((savedTask) => updateTask(savedTask));
	} else {
		updateTask(savedTasks);
	}
}

export function updateTask(task: Task) {
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

export function removeTask(task: Task) {
	tasks.update(($tasks) => $tasks.filter((existingTask) => existingTask.id !== task.id));
}

export function toggleEvent(task: Task) {
	tasks.update(($tasks) => [
		...$tasks.filter((existingTask) => existingTask.id !== task.id),
		{ ...task, isDone: !task.isDone },
	]);
}
