import { z } from 'zod';

import type { Category } from '$lib/category/category.model';
import type { dateISO, HHmm, yyyyMMdd } from '$lib/date.utils.svelte.js';
import type { Goal } from '$lib/goal/goal.model';

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
	'date' | 'recurringFrequency' | 'recurringEndAt' | 'recurringDaysOfWeek' | 'recurringExceptions'
> & {
	date: yyyyMMdd;
	recurringFrequency: Frequency;
	recurringDaysOfWeek: string[];
	recurringEndAt: yyyyMMdd;
	recurringExceptions: yyyyMMdd[];
};

export const taskSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	name: z.string(),
	isDone: z.boolean(),
	description: z.string(),
	image: z.string().nullable(),
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
			icon: z.string().nullable(),
			deadline: z.string(),
			isDone: z.boolean(),
		})
		.nullable(),
	date: z.string().nullable(),
	duration: z.string(),
	startTime: z.string().nullable(),
	// TODO type recurringFrequency better
	recurringFrequency: z.string().nullable(),
	recurringDaysOfWeek: z.array(z.string()),
	recurringEndAt: z.string().nullable(),
	recurringExceptions: z.array(z.string()),
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
