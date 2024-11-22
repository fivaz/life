import { z } from 'zod';

import type { Category } from '$lib/category/category.model';
import { categorySchema } from '$lib/category/category.model';
import type { dateISO, HHmm, yyyyMMdd } from '$lib/date.utils.svelte';
import type { Goal } from '$lib/goal/goal.model';
import { goalSchema } from '$lib/goal/goal.model';
import { zDate, zTime } from '$lib/utils';

export const frequencies = ['daily', 'weekly', 'monthly', 'yearly'] as const;
export type Frequency = (typeof frequencies)[number];

export type Task = {
	id: string;
	createdAt: dateISO;
	name: string;
	isDone: boolean;
	description: string;
	image: string | null;
	category: Category;
	goal: Goal | null;
	date: yyyyMMdd | null;
	duration: HHmm;
	startTime: HHmm | null;
	recurringFrequency: Frequency | null;
	// days of the week in (sun, mon, tue) format
	recurringDaysOfWeek: string[] | never[];
	recurringEndAt: yyyyMMdd | null;
	recurringExceptions: yyyyMMdd[] | never[];
};

export type CalendarTask = Omit<Task, 'date'> & { date: yyyyMMdd };

export type TimedTask = Omit<Task, 'startTime' | 'date'> & { startTime: HHmm; date: yyyyMMdd };

export type UntimedTask = Omit<Task, 'startTime'> & { startTime: null };

export type RecurringTask = Omit<
	Task,
	'date' | 'recurringFrequency' | 'recurringDaysOfWeek' | 'recurringExceptions'
> & {
	date: yyyyMMdd;
	recurringFrequency: Frequency;
	recurringDaysOfWeek: string[];
	recurringExceptions: yyyyMMdd[];
};

export const taskSchema = z.object({
	id: z.string(),
	createdAt: z.string().datetime(),
	name: z.string(),
	isDone: z.boolean(),
	description: z.string(),
	image: z.string().nullable(),
	category: categorySchema,
	goal: goalSchema.nullable(),
	date: zDate.nullable(),
	duration: zTime,
	startTime: zTime.nullable(),
	recurringFrequency: z.enum(frequencies).nullable(),
	recurringDaysOfWeek: z.array(z.string()),
	recurringEndAt: zDate.nullable(),
	recurringExceptions: z.array(zDate),
});

export function isRecurring(task: Omit<Task, 'id'> | Task): task is RecurringTask {
	return task.recurringFrequency !== null;
}

export function isUntimed(task: Omit<Task, 'id'> | Task): task is UntimedTask {
	return !task.startTime;
}

export function isTimed(task: Omit<Task, 'id'> | Task): task is TimedTask {
	return task.startTime !== null;
}

export type SubTask = { isDone: boolean; title: string };
