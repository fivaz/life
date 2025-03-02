import type { Task } from '@life/shared/task';
import type { ChartConfiguration } from 'chart.js/auto';
import {
	addDays,
	addMonths,
	addWeeks,
	addYears,
	format,
	startOfDay,
	startOfWeek,
	subWeeks,
} from 'date-fns';

import { getDoubleLineChartConfig } from './double-line-helper';
import { getLineChartConfig } from './line-helper';
import { getStackedChartConfig } from './stacked-helper';

export const intervals = ['day', 'week', 'month', 'trimester', 'year'] as const;

export type Interval = (typeof intervals)[number];

export function getStartOfCurrentWeek(): Date {
	return startOfWeek(subWeeks(new Date(), 1));
}

export function getLatestTaskDate(tasks: Task[]): Date {
	if (tasks.length === 0) {
		return new Date(); // Return current date if no tasks
	}

	return tasks.reduce((latest, task) => {
		const taskDate = new Date(task.date);
		return taskDate > latest ? taskDate : latest;
	}, new Date(0));
}

export function generateTimePeriods(
	interval: Interval,
	startDate: Date,
	endDate: Date,
): { start: Date; end: Date }[] {
	const periods: { start: Date; end: Date }[] = [];
	let currentDate = startOfDay(startDate);

	const addFunctions = {
		day: (date: Date, amount: number) => addDays(date, amount),
		week: (date: Date, amount: number) => addWeeks(date, amount),
		month: (date: Date, amount: number) => addMonths(date, amount),
		trimester: (date: Date, amount: number) => addMonths(date, amount * 3),
		year: (date: Date, amount: number) => addYears(date, amount),
	};

	while (currentDate < endDate) {
		const periodStart = currentDate;
		const periodEnd = addFunctions[interval](currentDate, 1);

		periods.push({ start: periodStart, end: periodEnd });
		currentDate = periodEnd;
	}

	return periods;
}

export function generatePeriodLabel(periodStart: Date, periodEnd: Date, interval: Interval) {
	let periodLabel: string;
	switch (interval) {
		case 'day':
			periodLabel = format(periodStart, 'MMM dd');
			break;
		case 'week':
			periodLabel = `${format(periodStart, 'MMM dd')} - ${format(periodEnd, 'MMM dd')}`;
			break;
		case 'month':
			periodLabel = format(periodStart, 'MMM yyyy');
			break;
		case 'trimester':
			periodLabel = `Q${Math.floor(periodStart.getMonth() / 3) + 1} ${periodStart.getFullYear()}`;
			break;
		case 'year':
			periodLabel = format(periodStart, 'yyyy');
			break;
		default:
			periodLabel = format(periodStart, 'MMM dd');
	}

	return periodLabel;
}

export type ReportChartType = 'stacked' | 'line' | 'double-line';

// Overload signatures
export function getChartConfig(
	charType: 'line',
	tasks: Task[],
	interval: Interval,
	startAt: string,
	endAt: string,
): ChartConfiguration<'line'>;

// Overload signatures
export function getChartConfig(
	charType: 'stacked',
	tasks: Task[],
	interval: Interval,
	startAt: string,
	endAt: string,
): ChartConfiguration<'bar'>;

// Implementation
export function getChartConfig(
	charType: ReportChartType,
	tasks: Task[],
	interval: Interval,
	startAt: string,
	endAt: string,
): ChartConfiguration<'line'> | ChartConfiguration<'bar'> {
	const { sortedTasks, startDate, endDate } = prepareData(tasks, startAt, endAt);

	const configChartHash = {
		line: getLineChartConfig(sortedTasks, interval, startDate, endDate),
		stacked: getStackedChartConfig(sortedTasks, interval, startDate, endDate),
		'double-line': getDoubleLineChartConfig(sortedTasks, interval, startDate, endDate),
	};

	return configChartHash[charType];
}

export function prepareData(
	tasks: Task[],
	periodStartAt: string,
	periodEndAt: string,
): { sortedTasks: Task[]; startDate: Date; endDate: Date } {
	const sortedTasks = [...tasks].sort(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	);

	// Handle default period values
	let startDate: Date;
	let endDate: Date;

	if (!periodStartAt) {
		// Default: start of the current week
		startDate = getStartOfCurrentWeek();
	} else {
		startDate = new Date(periodStartAt);
	}

	if (!periodEndAt) {
		// Default: week after the latest task date prevision
		const latestTaskDate = getLatestTaskDate(sortedTasks);
		endDate = new Date(latestTaskDate);
		endDate.setDate(endDate.getDate() + 7);
	} else {
		endDate = new Date(periodEndAt);
	}

	return {
		startDate,
		endDate,
		sortedTasks,
	};
}

// Count tasks created up to a specific period end date
export function countTasksCreatedUpToPeriod(tasks: Task[], periodEnd: Date): number {
	return tasks.filter((task) => {
		const createdAt = new Date(task.createdAt);
		return createdAt <= periodEnd;
	}).length;
}

// Count tasks completed up to a specific period end date
export function countTasksCompletedUpToPeriod(tasks: Task[], periodEnd: Date): number {
	return tasks.filter((task) => {
		const isCompleted = task.isDone === true;
		const completedAt = isCompleted ? new Date(task.date) : null;
		return isCompleted && completedAt! <= periodEnd;
	}).length;
}
