import type { Task } from '@life/shared/task';
import { isWithinInterval } from 'date-fns';

import type { Interval } from '../report-chart/service';
import { generatePeriodLabel, generateTimePeriods } from '../report-chart/service';

export function generateTasksByPeriod(
	tasks: Task[],
	interval: Interval,
	dateStart: Date,
	dateEnd: Date,
	isSimplified: boolean,
): Record<string, { created: Task[]; completed: Task[] }> {
	const periods = generateTimePeriods(interval, dateStart, dateEnd);

	const tasksByPeriod: Record<string, { created: Task[]; completed: Task[] }> = {};

	periods.forEach((period) => {
		const periodLabel = generatePeriodLabel(period.start, period.end, interval);

		// Get tasks created in this period
		const createdTasks = getTasksCreatedInPeriod(tasks, period.start, period.end);

		// Get tasks completed in this period
		const completedTasks = getTasksCompletedInPeriod(tasks, period.start, period.end);

		let filteredCreatedTasks = createdTasks;
		let filteredCompletedTasks = completedTasks;

		if (isSimplified) {
			const createdIds = new Set(createdTasks.map(t => t.id));
			const completedIds = new Set(completedTasks.map(t => t.id));
			const overlappingIds = new Set([...createdIds].filter(id => completedIds.has(id)));

			filteredCreatedTasks = createdTasks.filter(t => !overlappingIds.has(t.id));
			filteredCompletedTasks = completedTasks.filter(t => !overlappingIds.has(t.id));
		}

		tasksByPeriod[periodLabel] = {
			created: filteredCreatedTasks,
			completed: filteredCompletedTasks,
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
