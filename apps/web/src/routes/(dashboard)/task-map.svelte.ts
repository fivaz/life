import { formatDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { addDays, endOfWeek, startOfWeek } from 'date-fns';
import type { QueryConstraint } from 'firebase/firestore';
import { where } from 'firebase/firestore';

import { DB_PATH } from '$lib/consts';
import { fetchItemsCore } from '$lib/repository.svelte';
import { taskSchema } from '$lib/task/task.model';
import { fetchTasks } from '$lib/task/task.repository';
import { groupBy } from '$lib/utils';
import { SvelteDate, SvelteMap } from 'svelte/reactivity';

type TaskMap = {
	recurring: Task[];
	unique: Record<string, Task[]>;
};

export const tasksMap = $state<{ value: TaskMap }>({ value: { recurring: [], unique: {} } });

export function fetchFirstTasks() {
	// recurring tasks
	fetchTasks(tasksMap.value.recurring, where('recurringFrequency', '!=', ''));

	// tasks from this week, the previous and the next week
	fetchTasks(populateTaskMap, ...getTaskDateConstrain());
}

// this function will take the list of tasks receive by the fetchTasks and populate the tasksMap
function populateTaskMap(tasks: Task[]): void {
	const tasksByWeek = groupBy(tasks, (task) => formatDate(startOfWeek(task.date)));

	const weeks = Object.keys(tasksByWeek);

	weeks.forEach((week) => {
		tasksMap.value.unique[week] = tasksByWeek[week];
	});
}

export function getTaskDateConstrain(): QueryConstraint[] {
	const currentWeekStart = startOfWeek(new SvelteDate());
	const previousWeekStart = addDays(currentWeekStart, -7);
	const nextWeekStart = addDays(currentWeekStart, 7);

	const nextWeekEnd = endOfWeek(nextWeekStart);

	const startOfWeekString = formatDate(previousWeekStart);
	const endOfWeekString = formatDate(nextWeekEnd);

	return [where('date', '>=', startOfWeekString), where('date', '<=', endOfWeekString)];
}

export function convertTaskMapToList(taskMap: TaskMap): Task[] {
	// Extract tasks from 'recurring'
	const recurringTasks = taskMap.recurring;

	// Extract tasks from 'unique' and flatten them
	const uniqueTasks = Object.values(taskMap.unique).flat();

	// Combine both lists
	const tasks = [...recurringTasks, ...uniqueTasks];

	// remove duplicates
	return Array.from(
		tasks.reduce((map, task) => map.set(task.id, task), new SvelteMap<string, Task>()).values(),
	);
}

export function getWeekTasks(date: Date): void {
	const weekStart = startOfWeek(date);
	const weekStartString = formatDate(weekStart);
	// only fetch tasks for other weeks that haven't been fetched previously
	if (!tasksMap.value.unique[weekStartString]) {
		subscribeToWeekTasks(weekStart);
	}
}

function subscribeToWeekTasks(startOfWeek: Date) {
	const startOfWeekString = formatDate(startOfWeek);
	const endOfWeekString = formatDate(endOfWeek(startOfWeek));

	fetchItemsCore<Task>(
		(tasks) => (tasksMap.value.unique[startOfWeekString] = tasks),
		DB_PATH.TASKS,
		taskSchema,
		where('date', '>=', startOfWeekString),
		where('date', '<=', endOfWeekString),
	);
}
