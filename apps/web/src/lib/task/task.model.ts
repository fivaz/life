import type { Task as ExternalTask } from '@life/shared/types';
import { z } from 'zod';

import { categorySchema } from '$lib/category/category.model';
import { goalSchema } from '$lib/goal/goal.model';
import { zDate, zDateOrEmpty, zTime, zTimeOrEmpty } from '$lib/utils';

export const frequencies = ['daily', 'weekly', 'monthly', 'yearly'] as const;
export type Frequency = (typeof frequencies)[number];

export const taskSchema = z.object({
	id: z.string(),
	createdAt: z.string().datetime(),
	name: z.string(),
	isDone: z.boolean(),
	description: z.string(),
	image: z.string(),
	category: categorySchema,
	goal: goalSchema.nullable(),
	date: zDateOrEmpty,
	duration: zTime,
	startTime: zTimeOrEmpty,
	recurringFrequency: z.union([z.enum(frequencies), z.literal('')]),
	recurringDaysOfWeek: z.array(z.string()),
	recurringEndAt: zDateOrEmpty,
	recurringExceptions: z.array(zDate),
});

export type Task = ExternalTask;

export type CalendarTask = Task;

export type TimedTask = Task;

export type UntimedTask = Omit<Task, 'startTime'> & { startTime: '' };

export type RecurringTask = Omit<Task, 'recurringFrequency'> & {
	recurringFrequency: Frequency;
};

export function isRecurring(task: Omit<Task, 'id'> | Task): task is RecurringTask {
	return !!task.recurringFrequency;
}

export function isUntimed(task: Omit<Task, 'id'> | Task): task is UntimedTask {
	return !task.startTime;
}

export function isTimed(task: Omit<Task, 'id'> | Task) {
	return !!task.startTime;
}

export type SubTask = { isDone: boolean; title: string };
