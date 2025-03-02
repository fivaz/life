import { formatDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import type { ChartConfiguration } from 'chart.js';
import { isWithinInterval } from 'date-fns';

import type { Interval } from './service';
import { generatePeriodLabel, generateTimePeriods } from './service';

export function getStackedChartConfig(
	tasks: Task[],
	interval: Interval,
	periodStartAt: Date,
	periodEndAt: Date,
): ChartConfiguration<'bar'> {
	const { labels, created, completed } = getStackedChartDataset(
		tasks,
		interval,
		periodStartAt,
		periodEndAt,
	);

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

function getStackedChartDataset(tasks: Task[], interval: Interval, dateStart: Date, dateEnd: Date) {
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

function countTasksCreatedInPeriod(tasks: Task[], periodStart: Date, periodEnd: Date): number {
	return tasks.filter((task) => {
		const createdAt = new Date(task.createdAt);
		return isWithinInterval(createdAt, { start: periodStart, end: periodEnd });
	}).length;
}

// Count tasks completed in a specific period
function countTasksCompletedInPeriod(tasks: Task[], periodStart: Date, periodEnd: Date): number {
	return tasks.filter((task) => {
		const isCompleted = task.isDone === true;
		const completedAt = new Date(task.date);

		return isCompleted && isWithinInterval(completedAt, { start: periodStart, end: periodEnd });
	}).length;
}
