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

/**
 * The final flat structure required by Chart.js
 */
export interface ChartDataResult {
	labels: string[];
	data: number[];
	backgroundColor: string[];
}

/**
 * Internal structure for a time gap (Elapsed/Remaining)
 */
interface TimeGap {
	label: string;
	minutes: number;
	color: string;
}

const COLORS = {
	past: '#64748b', // slate-500
	available: '#e2e8f0', // slate-200
};

export const colorHexMap: Record<string, string> = {
	red: '#ef4444', // bg-red-500
	orange: '#f97316', // bg-orange-500
	pink: '#ec4899', // bg-pink-500
	rose: '#f43f5e', // bg-rose-500
	yellow: '#eab308', // bg-yellow-500
	lime: '#84cc16', // bg-lime-500
	green: '#22c55e', // bg-green-500
	teal: '#14b8a6', // bg-teal-500
	cyan: '#06b6d4', // bg-cyan-500
	sky: '#0ea5e9', // bg-sky-500
	blue: '#3b82f6', // bg-blue-500
	purple: '#a855f7', // bg-purple-500
};

/**
 * Step 1: Aggregation (Grouped by Parent Category)
 *  Transforms raw tasks into a summarized map of categories.
 *  * @input tasks: Task[]
 *  @returns { categoryMap: Map, totalAllocated: number }
 */
function getCategoryTotals(tasks: Task[]): {
	categoryMap: Map<string, { minutes: number; color: string; name: string }>;
	totalAllocated: number;
} {
	const categoryMap = new Map<string, { minutes: number; color: string; name: string }>();
	let totalAllocated = 0;

	for (const task of tasks) {
		const duration = convertTimeToMinutes(task.duration);

		// 1. Identify the grouping category (the parent, or the category itself if it is a parent)
		const rawCategory = task.category;

		// If the category has a parent, we use the parent. Otherwise, we use the category itself.
		const groupCategory = rawCategory.parent ? rawCategory.parent : rawCategory;

		const catId = groupCategory?.id || 'none';

		if (!categoryMap.has(catId)) {
			categoryMap.set(catId, {
				minutes: 0,
				// Fallback to slate if color is missing
				color: colorHexMap[groupCategory?.color || ''] || '#94a3b8',
				name: groupCategory?.name || 'Uncategorized',
			});
		}

		// 2. Add duration to the parent group
		categoryMap.get(catId)!.minutes += duration;
		totalAllocated += duration;
	}

	return { categoryMap, totalAllocated };
}

/**
 * Step 2: Gap Calculation
 * Determines "Elapsed" vs "Remaining" based on the current time.
 * * @input (unallocatedTotal: 1350, totalAllocated: 90, viewDate: Date)
 * @returns TimeGap[] -> e.g., [{ label: "Elapsed", minutes: 800, color: "#64..." }]
 */
function calculateTimeGaps(
	unallocatedTotal: number,
	totalAllocated: number,
	viewDate: Date,
): TimeGap[] {
	const gaps: TimeGap[] = [];

	if (isToday(viewDate)) {
		const minsPassed = Math.min(1440, differenceInMinutes(new Date(), startOfDay(viewDate)));
		// "Elapsed" is time that has passed minus the tasks you already performed/scheduled
		const elapsed = Math.max(0, minsPassed - totalAllocated);
		const remaining = Math.max(0, unallocatedTotal - elapsed);

		if (elapsed > 0) gaps.push({ label: 'Elapsed', minutes: elapsed, color: COLORS.past });
		if (remaining > 0)
			gaps.push({ label: 'Remaining', minutes: remaining, color: COLORS.available });
	} else if (isPast(viewDate)) {
		gaps.push({ label: 'Unused Time', minutes: unallocatedTotal, color: COLORS.past });
	} else {
		gaps.push({ label: 'Remaining', minutes: unallocatedTotal, color: COLORS.available });
	}

	return gaps;
}

/**
 * Main Orchestrator
 * Combines category totals and time gaps into a flat structure for the chart.
 * * @returns ChartDataResult -> { labels: string[], data: number[], backgroundColor: string[] }
 */
export function getProcessedChartData(tasks: Task[], viewDate: Date): ChartDataResult {
	const { categoryMap, totalAllocated } = getCategoryTotals(tasks);

	const labels: string[] = [];
	const data: number[] = [];
	const backgroundColor: string[] = [];

	// Flatten the Category Map into arrays
	for (const cat of categoryMap.values()) {
		labels.push(cat.name);
		data.push(cat.minutes);
		backgroundColor.push(cat.color);
	}

	const unallocatedTotal = Math.max(0, 1440 - totalAllocated);

	if (unallocatedTotal > 0) {
		const gaps = calculateTimeGaps(unallocatedTotal, totalAllocated, viewDate);

		for (const gap of gaps) {
			labels.push(gap.label);
			data.push(gap.minutes);
			backgroundColor.push(gap.color);
		}
	}

	return { labels, data, backgroundColor };
}
