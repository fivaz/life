import type { Task } from '@life/shared/task';
import type { ChartConfiguration } from 'chart.js';

import type { Interval } from './service';
import { generatePeriodLabel, generateTimePeriods } from './service';

export function getLineChartConfig(
	tasks: Task[],
	interval: Interval,
	periodStartAt: Date,
	periodEndAt: Date,
): ChartConfiguration<'line'> {
	const { labels, uncompleted } = getLineChartDataset(tasks, interval, periodStartAt, periodEndAt);

	return {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Uncompleted Tasks',
					data: uncompleted,
					borderColor: 'oklch(0.704 0.191 22.216)',
					fill: false,
				},
			],
		},
		options: {
			scales: {
				y: {
					ticks: {
						stepSize: 1,
					},
					grace: '10%',
					...(labels.length > 300 && {
						min: 0,
					}),
				},
			},
			elements: {
				point: {
					radius: labels.length > 300 ? 0 : 3,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
			},
		},
	};
}

function getLineChartDataset(tasks: Task[], interval: Interval, dateStart: Date, dateEnd: Date) {
	const periods = generateTimePeriods(interval, dateStart, dateEnd);

	const labels: string[] = [];
	const uncompleted: number[] = [];

	periods.forEach((period) => {
		const periodLabel = generatePeriodLabel(period.start, period.end, interval);

		const tasksUncompleted = countUncompletedTasksInPeriod(tasks, period.end);

		labels.push(periodLabel);
		uncompleted.push(tasksUncompleted);
	});

	return {
		labels,
		uncompleted,
	};
}

function countUncompletedTasksInPeriod(tasks: Task[], periodEnd: Date): number {
	return tasks.filter((task) => {
		const createdAt = new Date(task.createdAt);
		const isCompleted = task.isDone === true;
		const completedAt = isCompleted ? new Date(task.date) : null;

		return createdAt <= periodEnd && (!isCompleted || completedAt! > periodEnd);
	}).length;
}
