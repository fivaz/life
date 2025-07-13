import type { Category } from '$lib/category/category.model.js';
import type { Goal } from '$lib/goal/goal.model.js';

export const frequencies = ['daily', 'weekly', 'monthly', 'yearly'] as const;

export type Frequency = (typeof frequencies)[number];

export type Task = {
	id: string;
	createdAt: string;
	name: string;
	isDone: boolean;
	description: string;
	image: string;
	category: Category;
	goal: Goal | null;
	date: string;
	duration: string;
	startTime: string;
	recurringFrequency: Frequency | '';
	recurringDaysOfWeek: string[];
	recurringEndAt: string;
	recurringExceptions: string[];
	groupId?: string;
};

export type SubTask = { isDone: boolean; title: string };
