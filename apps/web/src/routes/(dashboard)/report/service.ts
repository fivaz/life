import type { Task } from '@life/shared/task';
import { sortTasks } from '@life/shared/task';

export const intervals = ['day', 'week'] as const;

export type Interval = (typeof intervals)[number];

function getStartDate(startDateString: string, sortedTasks: Task[]): Date {
	if (startDateString) {
		return new Date(startDateString);
	}

	const firstTask = sortedTasks.find((task) => task.date);
	if (!firstTask) {
		return new Date();
	}

	return new Date(firstTask.createdAt);
}

function getEndDate(endDateString: string, sortedTasks: Task[]): Date {
	if (endDateString) {
		return new Date(endDateString);
	}

	const lastTask = sortedTasks.toReversed().find((task) => task.date);
	if (!lastTask) {
		return new Date();
	}

	return new Date(lastTask.date);
}

export function generateGraphData(
	tasks: Task[],
	interval: Interval,
	startAt: string,
	endAt: string,
) {
	const dateLabels: string[] = [];
	const uncompletedCounts: number[] = [];

	// Helper function to format dates
	function formatDate(date: Date) {
		return date.toISOString().split('T')[0];
	}

	const sortedTasks = sortTasks(tasks);

	const currentDate = getStartDate(startAt, sortedTasks);
	const endDate = getEndDate(endAt, sortedTasks);

	// Generate date labels based on interval
	while (currentDate <= endDate) {
		dateLabels.push(formatDate(currentDate));
		uncompletedCounts.push(0);

		if (interval === 'day') {
			currentDate.setDate(currentDate.getDate() + 1);
		} else if (interval === 'week') {
			currentDate.setDate(currentDate.getDate() + 7);
		}
	}

	// Count uncompleted tasks for each date
	tasks.forEach((task) => {
		const taskCreatedAt = new Date(task.createdAt);
		const taskCompletedAt = task.isDone ? new Date(task.date) : endDate;

		dateLabels.forEach((label, index) => {
			const labelDate = new Date(label);

			if (taskCreatedAt <= labelDate && labelDate <= taskCompletedAt) {
				uncompletedCounts[index]++;
			}
		});
	});

	return { labels: dateLabels, data: uncompletedCounts };
}
