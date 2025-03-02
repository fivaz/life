import type { Task } from '@life/shared/task';
import type { ChartConfiguration } from 'chart.js/auto';
import {
	addDays,
	addMonths,
	addWeeks,
	addYears,
	format,
	isWithinInterval,
	parseISO,
	startOfDay,
	startOfWeek,
	subWeeks,
} from 'date-fns';

import type { Interval } from '../service';

export function getChartConfig(
	tasks: Task[],
	interval: Interval,
	periodStartAt: string,
	periodEndAt: string,
): ChartConfiguration<'bar'> {
	const { labels, created, completed } = getDataset(tasks, interval, periodStartAt, periodEndAt);

	return {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Created',
					data: created,
					backgroundColor: 'oklch(0.704 0.191 22.216)',
				},
				{
					label: 'Completed',
					data: completed,
					backgroundColor: 'oklch(0.792 0.209 151.711)',
				},
			],
		},
		options: {
			scales: {
				x: {
					stacked: true,
				},
				y: {
					stacked: true,
					beginAtZero: true,
				},
			},
		},
	};
}

export function getDataset(
	tasks: Task[],
	interval: Interval,
	periodStartAt: string,
	periodEndAt: string,
) {
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

	return generateDataset(sortedTasks, interval, startDate, endDate);
}

function getStartOfCurrentWeek(): Date {
	return startOfWeek(subWeeks(new Date(), 1));
}

function getLatestTaskDate(tasks: Task[]): Date {
	if (tasks.length === 0) {
		return new Date(); // Return current date if no tasks
	}

	return tasks.reduce((latest, task) => {
		const taskDate = new Date(task.date);
		return taskDate > latest ? taskDate : latest;
	}, new Date(0));
}

function generateDataset(tasks: Task[], interval: Interval, dateStart: Date, dateEnd: Date) {
	const periods = generateTimePeriods(interval, dateStart, dateEnd);

	const labels: string[] = [];
	const created: number[] = [];
	const completed: number[] = [];

	periods.forEach((period) => {
		const periodLabel = generatePeriodLabel(period.start, period.end, interval);

		const tasksCreated = countTasksCreatedInPeriod(tasks, period.start, period.end);

		const tasksCompleted = countTasksCompletedInPeriod(tasks, period.start, period.end);

		labels.push(periodLabel);
		created.push(tasksCreated);
		completed.push(tasksCompleted);
	});

	return {
		labels,
		created,
		completed,
	};
}

function generateTimePeriods(
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

function generatePeriodLabel(periodStart: Date, periodEnd: Date, interval: Interval) {
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

// Count tasks created in a specific period
function countTasksCreatedInPeriod(tasks: Task[], periodStart: Date, periodEnd: Date): number {
	return tasks.filter((task) => {
		const createdAt = new Date(task.createdAt);
		return isWithinInterval(createdAt, { start: periodStart, end: periodEnd });
	}).length;
}

// Count tasks completed in a specific period
function countTasksCompletedInPeriod(tasks: Task[], periodStart: Date, periodEnd: Date): number {
	return tasks.filter((task) => {
		const completedAt = new Date(task.date);
		return isWithinInterval(completedAt, { start: periodStart, end: periodEnd });
	}).length;
}
