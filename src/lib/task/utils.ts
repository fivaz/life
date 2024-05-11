import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';

import { convertTimeToMinutes } from '$lib/task/time-utils';

export type SubTask = { id: number; isDone: boolean; name: string };

export type CoreTask = {
	category: Category;
	description: string;
	duration: string;
	goal: Goal | null;
	id: string;
	image?: string;
	isDone: boolean;
	name: string;
	subTasks?: SubTask[];
};

export type ToDo = CoreTask & {
	deadline: string;
};

export type Event = CoreTask & {
	date: string;
	startTime: string;
};

export type RecurringEvent = Event & {
	recurringDaysOfWeek: string[];
	recurringEndAt: string;
	recurringExceptions: string[];
	recurringStartAt: string;
};

export type Task = ToDo & Event & RecurringEvent;

export type AnyEvent = Event | RecurringEvent;

export type AnyTask = AnyEvent | ToDo;

export function getDurationInMinutes(task: AnyTask) {
	return convertTimeToMinutes(getDuration(task)) || 0;
}

export function getDuration(task: AnyTask) {
	// this need to be done because there might be a task without duration in the db
	if ('duration' in task && task.duration) {
		return task.duration;
	}
	return '00:00';
}
