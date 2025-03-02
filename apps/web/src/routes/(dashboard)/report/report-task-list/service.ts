import type { Task } from '@life/shared/task';
import { isWithinInterval } from 'date-fns';

import { getLineChartConfig } from '../report-chart/line-helper';
import type { Interval, ReportChartType } from '../report-chart/service';
import { generatePeriodLabel, generateTimePeriods, prepareData } from '../report-chart/service';

export function generateTasksByPeriod(
	tasks: Task[],
	interval: Interval,
	dateStart: Date,
	dateEnd: Date,
): Record<string, { created: Task[]; completed: Task[] }> {
	const periods = generateTimePeriods(interval, dateStart, dateEnd);

	const tasksByPeriod: Record<string, { created: Task[]; completed: Task[] }> = {};

	periods.forEach((period) => {
		const periodLabel = generatePeriodLabel(period.start, period.end, interval);

		// Get tasks created in this period
		const createdTasks = getTasksCreatedInPeriod(tasks, period.start, period.end);

		// Get tasks completed in this period
		const completedTasks = getTasksCompletedInPeriod(tasks, period.start, period.end);

		// Add to the result object
		tasksByPeriod[periodLabel] = {
			created: createdTasks,
			completed: completedTasks,
		};
	});

	return tasksByPeriod;
}

// Get tasks created in a specific period
function getTasksCreatedInPeriod(tasks: Task[], periodStart: Date, periodEnd: Date): Task[] {
	return tasks.filter((task) => {
		const createdAt = new Date(task.createdAt);
		return isWithinInterval(createdAt, { start: periodStart, end: periodEnd });
	});
}

// Get tasks completed in a specific period
function getTasksCompletedInPeriod(tasks: Task[], periodStart: Date, periodEnd: Date): Task[] {
	return tasks.filter((task) => {
		const isCompleted = task.isDone === true;
		const completedAt = isCompleted ? new Date(task.date) : null;
		return isCompleted && isWithinInterval(completedAt!, { start: periodStart, end: periodEnd });
	});
}
