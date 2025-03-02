import type { Task } from '@life/shared/task';
import type { ChartConfiguration } from 'chart.js';

import type { Interval } from './service';
import {
	countTasksCompletedUpToPeriod,
	countTasksCreatedUpToPeriod,
	generatePeriodLabel,
	generateTimePeriods,
} from './service';

export function getDoubleLineChartConfig(
	tasks: Task[],
	interval: Interval,
	periodStartAt: Date,
	periodEndAt: Date,
): ChartConfiguration<'line'> {
	const { labels, tasksCreated, tasksCompleted } = getDoubleLineChartDataset(
		tasks,
		interval,
		periodStartAt,
		periodEndAt,
	);

	return {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Tasks Created',
					data: tasksCreated,
					borderColor: 'oklch(0.704 0.191 22.216)', // Blue
					backgroundColor: 'oklch(0.704 0.191 22.216 / 0.2)', // Semi-transparent blue
					fill: true, // Fill area under the line
				},
				{
					label: 'Tasks Completed',
					data: tasksCompleted,
					borderColor: 'oklch(0.792 0.209 151.711)', // Green
					backgroundColor: 'oklch(0.792 0.209 151.711 / 0.2)', // Semi-transparent green
					fill: true, // Fill area under the line
				},
			],
		},
		options: {
			responsive: true,
			interaction: {
				mode: 'index', // Show tooltips for both datasets at the same x-axis value
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Time',
					},
				},
				y: {
					grace: '10%',
					beginAtZero: true,
					title: {
						display: true,
						text: 'Number of Tasks',
					},
				},
			},
		},
	};
}

function getDoubleLineChartDataset(
	tasks: Task[],
	interval: Interval,
	dateStart: Date,
	dateEnd: Date,
) {
	const periods = generateTimePeriods(interval, dateStart, dateEnd);

	const labels: string[] = [];
	const tasksCreated: number[] = [];
	const tasksCompleted: number[] = [];

	periods.forEach((period) => {
		const periodLabel = generatePeriodLabel(period.start, period.end, interval);

		// Count tasks created up to the end of this period
		const created = countTasksCreatedUpToPeriod(tasks, period.end);

		// Count tasks completed up to the end of this period
		const completed = countTasksCompletedUpToPeriod(tasks, period.end);

		labels.push(periodLabel);
		tasksCreated.push(created);
		tasksCompleted.push(completed);
	});

	return {
		labels,
		tasksCreated,
		tasksCompleted,
	};
}
