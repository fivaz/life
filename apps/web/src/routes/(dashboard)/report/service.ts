import type { Task } from '@life/shared/task';
import { sortTasks } from '@life/shared/task';
import {
	addDays,
	addMonths,
	addQuarters,
	addWeeks,
	addYears,
	format,
	isSameDay,
	parse,
	startOfDay,
} from 'date-fns';

import { DATE_FR } from '$lib/utils.svelte';

export const intervals = ['day', 'week', 'month', 'trimester', 'year'] as const;

export type Interval = (typeof intervals)[number];

export function generateGraphData(
	tasks: Task[],
	interval: Interval,
	startAt: string,
	endAt: string,
): {
	labels: string[];
	data: number[];
	added: Record<string, Task[]>;
	removed: Record<string, Task[]>;
} {
	const labels: string[] = [];
	const uncompletedCounts: number[] = [];
	const added: Record<string, Task[]> = {};
	const removed: Record<string, Task[]> = {};

	if (tasks.length === 0) {
		return {
			labels,
			data: uncompletedCounts,
			added,
			removed,
		};
	}

	const sortedTasks = sortTasks(tasks);

	let currentDate = getStartDate(startAt, sortedTasks);
	const endDate = getEndDate(endAt, sortedTasks);

	// Generate date labels based on interval
	while (currentDate <= endDate) {
		const label = format(currentDate, DATE_FR);
		labels.push(label);
		uncompletedCounts.push(0);
		added[label] = [];
		removed[label] = [];

		currentDate = getNextDate(currentDate, interval);
	}

	const activeTasks = new Set<string>();

	sortedTasks.forEach((task) => {
		const taskCreatedAt = startOfDay(task.createdAt);
		const taskCompletedAt = task.isDone && task.date ? startOfDay(task.date) : endDate;
		labels.forEach((label, index) => {
			const labelDate = startOfDay(parse(label, DATE_FR, new Date()));

			if (taskCreatedAt <= labelDate && labelDate <= taskCompletedAt) {
				uncompletedCounts[index]++;

				if (!activeTasks.has(task.id)) {
					added[label].push(task);
					activeTasks.add(task.id);
				}
			} else if (activeTasks.has(task.id)) {
				removed[label].push(task);
				activeTasks.delete(task.id);
			}
		});
	});

	return {
		labels,
		data: uncompletedCounts,
		added,
		removed,
	};
}

function getNextDate(currentDate: Date, interval: Interval): Date {
	if (interval === 'week') {
		return addWeeks(currentDate, 1);
	}
	if (interval === 'month') {
		return addMonths(currentDate, 1);
	}
	if (interval === 'trimester') {
		return addQuarters(currentDate, 1);
	}
	if (interval === 'year') {
		return addYears(currentDate, 1);
	}

	return addDays(currentDate, 1);
}

function getStartDate(startDateString: string, sortedTasks: Task[]): Date {
	let date: Date | string = new Date();

	if (startDateString) {
		date = startDateString;
	} else {
		const firstTask = sortedTasks.find((task) => task.date);
		if (firstTask) {
			date = firstTask.createdAt;
		}
	}

	return startOfDay(addDays(date, 1));
}

function getEndDate(endDateString: string, sortedTasks: Task[]): Date {
	let date: Date | string = new Date();

	if (endDateString) {
		date = endDateString;
	} else {
		const lastTask = sortedTasks.toReversed().find((task) => task.date);
		if (lastTask) {
			date = lastTask.date;
		}
	}

	return startOfDay(addDays(date, 1));
}

export type Summary = 'equal' | 'increased' | 'decreased';

export function getDatasetSummary(datasetData: number[]): Summary {
	const firstItem = datasetData[0];

	const lastItem = datasetData[datasetData.length - 1];

	if (lastItem > firstItem) {
		return 'increased';
	} else if (lastItem < firstItem) {
		return 'decreased';
	} else {
		return 'equal';
	}
}

export function getTaskDelta(
	dataset: { added: Record<string, Task[]>; removed: Record<string, Task[]> },
	label: string,
): number {
	return dataset.added[label].length - dataset.removed[label].length;
}
