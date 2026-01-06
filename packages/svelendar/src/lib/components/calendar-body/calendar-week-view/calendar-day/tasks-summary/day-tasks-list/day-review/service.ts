import { convertTimeToMinutes } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { ArcElement, type ChartConfiguration,Legend, PieController, Tooltip } from 'chart.js';

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

export interface ChartDataResult {
	labels: string[];
	data: number[];
	backgroundColor: string[];
}

export function getProcessedChartData(tasks: Task[]): ChartDataResult {
	const categories: Record<string, { minutes: number; color: string; name: string }> = {};
	let totalAllocated = 0;

	tasks.forEach((task) => {
		const cat = task.category;
		const id = cat?.id || 'none';
		const duration = convertTimeToMinutes(task.duration);

		if (!categories[id]) {
			categories[id] = {
				minutes: 0,
				color: colorHexMap[cat?.color] || '#94a3b8',
				name: cat?.name || 'Uncategorized',
			};
		}
		categories[id].minutes += duration;
		totalAllocated += duration;
	});

	const labels = Object.values(categories).map((c) => c.name);
	const data = Object.values(categories).map((c) => c.minutes);
	const backgroundColor = Object.values(categories).map((c) => c.color);

	if (totalAllocated < 1440) {
		labels.push('Remaining');
		data.push(1440 - totalAllocated);
		backgroundColor.push('#e5e7eb');
	}

	return { labels, data, backgroundColor };
}

export function createChartConfig(chartData: ChartDataResult): ChartConfiguration<'pie'> {
	return {
		type: 'pie',
		data: {
			labels: chartData.labels,
			datasets: [
				{
					data: chartData.data,
					backgroundColor: chartData.backgroundColor,
					borderWidth: 0,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
			},
		},
	};
}

export const chartPlugins = [PieController, ArcElement, Tooltip, Legend];