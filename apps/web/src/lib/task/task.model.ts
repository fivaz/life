import type { Task } from '@life/shared/task';
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
	groupId: z.string().optional(),
	date: zDateOrEmpty,
	duration: zTime,
	startTime: zTimeOrEmpty,
	recurringFrequency: z.union([z.enum(frequencies), z.literal('')]),
	recurringDaysOfWeek: z.array(z.string()),
	recurringEndAt: zDateOrEmpty,
	recurringExceptions: z.array(zDate),
});

export function isTimed(task: Omit<Task, 'id'> | Task) {
	return !!task.startTime;
}
