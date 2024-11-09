import { z } from 'zod';

import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';
import { convertTimeToMinutes, getTaskDateTime } from '$lib/task/time-utils';

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
	startTime: string;
	recurringFrequency: (typeof frequencies)[number];
	// days of the week in (sun, mon, tue) format
	recurringDaysOfWeek: string[];
	recurringEndAt: string;
	// list of dates in yyyy-MM-dd format
	recurringExceptions: string[];
};

export const frequencies = ['daily', 'weekly', 'monthly', 'yearly', ''] as const;

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
			deadline: z.string(),
			icon: z.null().nullable(),
			id: z.string(),
			isDone: z.boolean(),
			name: z.string(),
		})
		.nullable(),
	date: z.string(),
	duration: z.string(),
	startTime: z.string(),
	// TODO type recurringFrequency better
	recurringFrequency: z.string(),
	recurringDaysOfWeek: z.array(z.string()),
	recurringEndAt: z.string(),
	recurringExceptions: z.array(z.string()),
});

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

export function isRecurring(task: Omit<Task, 'id'> | Task) {
	return !!task.recurringFrequency;
}

export function isUntimed(task: Omit<Task, 'id'> | Task) {
	return !task.startTime;
}

export function isTimed(task: Omit<Task, 'id'> | Task) {
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
