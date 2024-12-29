import type { Task } from '@life/shared/task';
import { sortTasks } from '@life/shared/task';

export const intervals = ['day', 'week'] as const;

export type Interval = (typeof intervals)[number];

export function filterTasksInPeriod(tasks: Task[], startAt: string, endAt: string): Task[] {
	const startDate = new Date(startAt);
	const endDate = new Date(endAt);

	const x = tasks.filter((task) => {
		const createdAt = new Date(task.createdAt);
		const completedAt = task.isDone ? new Date(task.date) : new Date();

		// Task should overlap with the selected range
		return !(completedAt < startDate || createdAt > endDate);
	});

	console.log(x);
	return x;
}

export function generateGraphData(
	tasks: Task[],
	interval: Interval,
	startAt: string,
	endAt: string,
): {
	labels: string[];
	data: number[];
	added: Record<string, Task[]>;
	removed: Record<string, Task[]>;
	tasks: Record<string, Task[]>;
} {
	const dateLabels: string[] = [];
	const uncompletedCounts: number[] = [];
	const uncompletedTasks: Record<string, Task[]> = {};
	const addedTasks: Record<string, Task[]> = {};
	const removedTasks: Record<string, Task[]> = {};

	// Helper function to format dates
	function formatDate(date: Date) {
		return date.toISOString().split('T')[0];
	}

	const sortedTasks = sortTasks(tasks);

	const currentDate = getStartDate(startAt, sortedTasks);
	const endDate = getEndDate(endAt, sortedTasks);

	// Generate date labels based on interval
	while (currentDate <= endDate) {
		const label = formatDate(currentDate);
		dateLabels.push(label);
		uncompletedCounts.push(0);
		uncompletedTasks[label] = [];
		addedTasks[label] = [];
		removedTasks[label] = [];

		if (interval === 'day') {
			currentDate.setDate(currentDate.getDate() + 1);
		} else if (interval === 'week') {
			currentDate.setDate(currentDate.getDate() + 7);
		}
	}

	const activeTasks = new Set<string>();

	// Count uncompleted tasks for each date
	sortedTasks.forEach((task) => {
		const taskCreatedAt = new Date(task.createdAt);
		const taskCompletedAt = task.isDone ? new Date(task.date) : endDate;

		dateLabels.forEach((label, index) => {
			const labelDate = new Date(label);

			if (taskCreatedAt <= labelDate && labelDate <= taskCompletedAt) {
				uncompletedCounts[index]++;
				uncompletedTasks[label].push(task);

				if (!activeTasks.has(task.id)) {
					addedTasks[label].push(task);
					activeTasks.add(task.id);
				}
			} else if (activeTasks.has(task.id)) {
				removedTasks[label].push(task);
				activeTasks.delete(task.id);
			}
		});
	});

	const x = {
		labels: dateLabels,
		data: uncompletedCounts,
		tasks: uncompletedTasks,
		added: addedTasks,
		removed: removedTasks,
	};

	console.log(x);

	return x;
}

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

export type Summary = 'equal' | 'increased' | 'decreased';

export function getDatasetSummary(datasetData: number[]): Summary {
	const firstItem = datasetData[0];

	const lastItem = datasetData[datasetData.length - 1];

	if (lastItem > firstItem) {
		return 'increased';
	} else if (lastItem < firstItem) {
		return 'decreased';
	} else {
		return 'equal';
	}
}
