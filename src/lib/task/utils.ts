import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';

import { convertTimeToMinutes, getTaskDateTime } from '$lib/task/time-utils';

export type CoreTask = {
	category: Category;
	createdAt: string;
	description: string;
	duration: string;
	goal: Goal | null;
	id: string;
	image?: string;
	isDone: boolean;
	name: string;
	date: string;
};

export type UnTimedTask = CoreTask;

export type TimedTask = CoreTask & {
	startTime: string;
};

export const frequencies = ['daily', 'weekly', 'monthly', 'yearly'] as const;

export type RecurringTimedTask = TimedTask & {
	recurringFrequency: (typeof frequencies)[number];
	recurringDaysOfWeek: string[];
	recurringEndAt: string;
	recurringExceptions: string[];
};

export type AnyTimedTask = TimedTask | RecurringTimedTask;

export type Task = AnyTimedTask | UnTimedTask;

export function getDurationInMinutes(task: Task) {
	return convertTimeToMinutes(task.duration);
}

export function sortTasks(tasks: Task[]) {
	return tasks.toSorted((a, b) => {
		const dateA = getTaskDateTime(a);

		const dateB = getTaskDateTime(b);

		if (!dateA) {
			return 1;
		}

		if (!dateB) {
			return -1;
		}

		return dateA.getTime() - dateB.getTime();
	});
}

export function isRecurring(task: Omit<Task, 'id'> | Task): task is RecurringTimedTask {
	return 'recurringFrequency' in task;
}

export function isUntimed(task: Omit<Task, 'id'> | Task): task is UnTimedTask {
	return !('startTime' in task);
}

export function isTimed(task: Omit<Task, 'id'> | Task): task is TimedTask {
	return 'startTime' in task;
}

export type SubTask = { isDone: boolean; title: string };

export function getSubTasks(task: CoreTask): SubTask[] {
	// \[\s?([x ])\s?\] matches either [x] or [ ] (with optional spaces inside).
	// \s-\s matches the separator - (a space, dash, space).
	// (.+) captures the message part (anything after the separator).
	const regex = /\[\s?([x ])\s?]\s-\s(.+)/g;

	let match: RegExpExecArray | null;
	const subTasks: { isDone: boolean; title: string }[] = [];

	while ((match = regex.exec(task.description)) !== null) {
		subTasks.push({
			isDone: match[1].toLowerCase() === 'x',
			title: match[2].trim(),
		});
	}

	return subTasks;
}

export function getCompletedTasks(subtasks: SubTask[]): number {
	return subtasks.filter((subtask) => subtask.isDone).length;
}
