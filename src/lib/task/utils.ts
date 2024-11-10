import { z } from 'zod';

import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import { convertTimeToMinutes, getTaskDateTime } from '$lib/task/time-utils';

export const frequencies = ['daily', 'weekly', 'monthly', 'yearly'] as const;
type Frequency = (typeof frequencies)[number];

export type Task = {
	id: string;
	// date in ISO format
	createdAt: string;
	name: string;
	isDone: boolean;
	description: string;
	image: string;
	category: Category;
	goal: Goal | null;
	// date in yyyy-MM-dd format
	date: string;
	// time in HH:mm format
	duration: string;
	// time in HH:mm format
	startTime: string | null;
	recurringFrequency: Frequency | null;
	// days of the week in (sun, mon, tue) format
	recurringDaysOfWeek: string[] | never[];
	recurringEndAt: string | null;
	// list of dates in yyyy-MM-dd format
	recurringExceptions: string[] | never[];
};

export type TimedTask = Omit<Task, 'startTime'> & { startTime: string };
export type UntimedTask = Omit<Task, 'startTime'> & { startTime: null };
export type RecurringTask = Omit<
	Task,
	'recurringFrequency' | 'recurringEndAt' | 'recurringDaysOfWeek' | 'recurringExceptions'
> & {
	recurringFrequency: Frequency;
	recurringDaysOfWeek: string[];
	recurringEndAt: string;
	recurringExceptions: string[];
};

export const taskSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	name: z.string(),
	isDone: z.boolean(),
	description: z.string(),
	image: z.string(),
	category: z.object({
		name: z.string(),
		isDefault: z.boolean(),
		type: z.string(),
		color: z.string(),
	}),
	goal: z
		.object({
			id: z.string(),
			name: z.string(),
			icon: z.null().nullable(),
			deadline: z.string(),
			isDone: z.boolean(),
		})
		.nullable(),
	date: z.string(),
	duration: z.string(),
	startTime: z.string().nullable(),
	// TODO type recurringFrequency better
	recurringFrequency: z.string().nullable(),
	recurringDaysOfWeek: z.array(z.string()),
	recurringEndAt: z.string().nullable(),
	recurringExceptions: z.array(z.string()),
});

export function getDurationInMinutes(task: Task) {
	return convertTimeToMinutes(task.duration);
}

export function sortTasks<T extends Task>(tasks: T[]): T[] {
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

export function isRecurring(task: Omit<Task, 'id'> | Task): task is RecurringTask {
	return !!task.recurringFrequency;
}

export function isUntimed(task: Omit<Task, 'id'> | Task): task is UntimedTask {
	return !task.startTime;
}

export function isTimed(task: Omit<Task, 'id'> | Task): task is TimedTask {
	return !!task.startTime;
}

export type SubTask = { isDone: boolean; title: string };

export function getSubTasks(task: Task): SubTask[] {
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
