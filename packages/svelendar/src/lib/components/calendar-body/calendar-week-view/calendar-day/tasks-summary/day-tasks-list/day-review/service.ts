import { convertMinutesToTime, convertTimeToMinutes } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { ArcElement, type ChartConfiguration, Legend, PieController, Tooltip } from 'chart.js';
import { differenceInMinutes, isPast, isToday, startOfDay } from 'date-fns';

export const chartPlugins = [PieController, ArcElement, Tooltip, Legend];

export interface ChartDataResult {
	labels: string[];
	data: number[];
	backgroundColor: string[];
}

export const colorHexMap: Record<string, string> = {
	red: '#ef4444',
	orange: '#f97316',
	pink: '#ec4899',
	rose: '#f43f5e',
	yellow: '#eab308',
	lime: '#84cc16',
	green: '#22c55e',
	teal: '#14b8a6',
	cyan: '#06b6d4',
	sky: '#0ea5e9',
	blue: '#3b82f6',
	purple: '#a855f7',
};

export function getProcessedChartData(tasks: Task[], viewDate: Date): ChartDataResult {
	const categories: Record<string, { minutes: number; color: string; name: string }> = {};
	let totalAllocated = 0;

	tasks.forEach((task) => {
		const cat = task.category;
		const id = cat?.id || 'none';
		const duration = convertTimeToMinutes(task.duration);

		if (!categories[id]) {
			categories[id] = {
				minutes: 0,
				color: colorHexMap[cat?.color || ''] || '#94a3b8',
				name: cat?.name || 'Uncategorized',
			};
		}
		categories[id].minutes += duration;
		totalAllocated += duration;
	});

	const labels = Object.values(categories).map((c) => c.name);
	const data = Object.values(categories).map((c) => c.minutes);
	const backgroundColor = Object.values(categories).map((c) => c.color);

	const totalDayMinutes = 1440;
	const unallocatedTotal = Math.max(0, totalDayMinutes - totalAllocated);

	if (unallocatedTotal > 0) {
		if (isToday(viewDate)) {
			const minutesPassedToday = Math.min(
				totalDayMinutes,
				differenceInMinutes(new Date(), startOfDay(viewDate)),
			);
			const elapsed = Math.max(0, minutesPassedToday - totalAllocated);
			const remaining = Math.max(0, unallocatedTotal - elapsed);

			if (elapsed > 0) {
				labels.push('Elapsed');
				data.push(elapsed);
				backgroundColor.push('#cbd5e1'); // slate-300
			}
			if (remaining > 0) {
				labels.push('Remaining');
				data.push(remaining);
				backgroundColor.push('#e5e7eb'); // gray-200
			}
		} else if (isPast(viewDate)) {
			labels.push('Unused Time');
			data.push(unallocatedTotal);
			backgroundColor.push('#94a3b8'); // slate-400
		} else {
			labels.push('Remaining');
			data.push(unallocatedTotal);
			backgroundColor.push('#e5e7eb'); // gray-200
		}
	}

	return { labels, data, backgroundColor };
}

export function getChartConfig(processed: ChartDataResult): ChartConfiguration<'pie'> {
	return {
		type: 'pie',
		data: {
			labels: processed.labels,
			datasets: [
				{
					data: processed.data,
					backgroundColor: processed.backgroundColor,
					borderWidth: 0,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: {
					callbacks: {
						// This function runs when you hover over a slice
						label: function (context) {
							const label = context.label || '';
							const value = context.parsed; // This is the minutes from our data array

							if (value !== undefined) {
								// Use your existing converter here
								const timeString = convertMinutesToTime(value);
								return ` ${label}: ${timeString}`;
							}
							return label;
						},
					},
				},
			},
		},
	};
}
