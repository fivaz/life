import type { Task } from '@life/shared/task';
import { sortTasks } from '@life/shared/task';
import {
	addDays,
	addMonths,
	addQuarters,
	addWeeks,
	addYears,
	endOfDay,
	endOfMonth,
	endOfWeek,
	endOfYear,
	format,
	isBefore,
	isSameDay,
	isWithinInterval,
	parse,
	parseISO,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
} from 'date-fns';

import { DATE_FR } from '$lib/utils.svelte';

export const intervals = ['day', 'week', 'month', 'trimester', 'year'] as const;

export type Interval = (typeof intervals)[number];

export type Dataset = {
	labels: string[];
	data: number[];
	added: Record<string, Task[]>;
	removed: Record<string, Task[]>;
};

export function generateGraphData(
	tasks: Task[],
	interval: Interval,
	startAt: string,
	endAt: string,
): Dataset {
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

	tasks.forEach((task) => {
		const taskCreatedAt = startOfDay(task.createdAt);
		const taskCompletedAt = task.isDone && task.date ? startOfDay(task.date) : endDate;

		const existingTasks = new Set<string>();

		labels.forEach((label, index) => {
			const labelDate = startOfDay(parse(label, DATE_FR, new Date()));

			if (isSameDay(taskCreatedAt, labelDate)) {
				if (!existingTasks.has(task.id)) {
					added[label].push(task);
					existingTasks.add(task.id);
				}
			}

			if (task.isDone && isSameDay(taskCompletedAt, labelDate)) {
				removed[label].push(task);
				uncompletedCounts[index]--;
				existingTasks.delete(task.id);
			}

			if (taskCreatedAt <= labelDate && labelDate <= taskCompletedAt) {
				uncompletedCounts[index]++;

				if (isBefore(taskCreatedAt, labelDate)) {
					if (!existingTasks.has(task.id)) {
						existingTasks.add(task.id);
						added[label].push(task);
					}
				}
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

	return startOfDay(date);
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

	return startOfDay(date);
}

export function getDatasetDelta(datasetData: number[]): number {
	const firstItem = datasetData[0];

	const lastItem = datasetData[datasetData.length - 1];

	return lastItem - firstItem;
}

interface IntervalResult {
	periodStart: string;
	periodEnd: string;
	createdTasks: Task[];
	completedTasks: Task[];
}

function getTasksByInterval(
	tasks: Task[],
	selectedInterval: Interval,
	periodStartAt: string,
	periodEndAt: string,
): IntervalResult[] {
	const startDate = parseISO(periodStartAt);
	const endDate = parseISO(periodEndAt);
	const results: IntervalResult[] = [];

	// Function to get the next date based on interval
	const getNextDate = (date: Date): Date => {
		switch (selectedInterval) {
			case 'day':
				return addDays(date, 1);
			case 'week':
				return addWeeks(date, 1);
			case 'month':
				return addMonths(date, 1);
			case 'trimester':
				return addQuarters(date, 1);
			case 'year':
				return addYears(date, 1);
		}
	};

	let currentStart = startDate;

	while (currentStart < endDate) {
		const currentEnd = getNextDate(currentStart);
		const periodInterval = {
			start: currentStart,
			end: currentEnd <= endDate ? currentEnd : endDate,
		};

		const createdTasks = tasks.filter((task) =>
			isWithinInterval(parseISO(task.createdAt), periodInterval),
		);

		const completedTasks = tasks.filter(
			(task) => task.isDone && isWithinInterval(parseISO(task.date), periodInterval),
		);

		results.push({
			periodStart: format(currentStart, 'yyyy-MM-dd'),
			periodEnd: format(periodInterval.end, 'yyyy-MM-dd'),
			createdTasks,
			completedTasks,
		});

		currentStart = currentEnd;
	}

	return results;
}
