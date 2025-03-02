import type { Task } from '@life/shared/task';
import type { ChartConfiguration } from 'chart.js';

import type { Interval } from './service';
import {
	countTasksCompletedUpToPeriod,
	countTasksCreatedUpToPeriod,
	generatePeriodLabel,
	generateTimePeriods,
} from './service';

export function getLineChartConfig(
	tasks: Task[],
	interval: Interval,
	periodStartAt: Date,
	periodEndAt: Date,
): ChartConfiguration<'line'> {
	const { labels, uncompletedTasks } = getLineChartDataset(
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
					label: 'Uncompleted Tasks',
					data: uncompletedTasks,
					borderColor: 'oklch(0.704 0.191 22.216)', // Blue
					backgroundColor: 'oklch(0.704 0.191 22.216 / 0.2)', //
					fill: true,
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
					beginAtZero: true,
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
	const uncompletedTasks: number[] = [];

	let cumulativeCreated = 0;
	let cumulativeCompleted = 0;

	periods.forEach((period) => {
		const periodLabel = generatePeriodLabel(period.start, period.end, interval);

		// Count tasks created up to the end of this period
		cumulativeCreated = countTasksCreatedUpToPeriod(tasks, period.end);

		// Count tasks completed up to the end of this period
		cumulativeCompleted = countTasksCompletedUpToPeriod(tasks, period.end);

		// Calculate uncompleted tasks
		const uncompleted = cumulativeCreated - cumulativeCompleted;

		labels.push(periodLabel);
		uncompletedTasks.push(uncompleted);
	});

	return {
		labels,
		uncompletedTasks,
	};
}
