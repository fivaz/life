import { z } from 'zod';

import type { Category } from '$lib/category/category.model';
import { categorySchema } from '$lib/category/category.model';
import type { dateISO, HHmm, yyyyMMdd } from '$lib/date.utils.svelte';
import type { Goal } from '$lib/goal/goal.model';
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

export type Task = z.infer<typeof taskSchema>;

export type CalendarTask = Omit<Task, 'date'> & { date: yyyyMMdd };

export type TimedTask = Omit<Task, 'startTime' | 'date'> & { startTime: HHmm; date: yyyyMMdd };

export type UntimedTask = Omit<Task, 'startTime'> & { startTime: '' };

export type RecurringTask = Omit<
	Task,
	'date' | 'recurringFrequency' | 'recurringDaysOfWeek' | 'recurringExceptions'
> & {
	date: yyyyMMdd;
	recurringFrequency: Frequency;
	recurringDaysOfWeek: string[];
	recurringExceptions: yyyyMMdd[];
};

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
