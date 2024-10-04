import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';

import { DbPaTH } from '$lib/consts';
import { db } from '$lib/firebase';
import { convertTimeToMinutes, getTaskDateTime } from '$lib/task/time-utils';
import { type Query, collection, query, where } from 'firebase/firestore';

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
	return convertTimeToMinutes(task.duration);
}

export function sortTasks(tasks: AnyTask[]) {
	return tasks.sort((a, b) => {
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

export function isRecurring(task: AnyTask | Omit<AnyTask, 'id'>): task is RecurringEvent {
	return 'recurringStartAt' in task;
}

export function isToDo(task: AnyTask | Omit<AnyTask, 'id'>): task is ToDo {
	return 'deadline' in task;
}

export function queryUncompletedTasks(userId: string) {
	const tasksRef = collection(db, `${DbPaTH.USERS}/${userId}/${DbPaTH.TASKS}`);
	return query(tasksRef, where('isDone', '==', false)) as Query<AnyTask>;
}

export type SubTask = { isDone: boolean; title: string };

export function getSubTasks(task: CoreTask): SubTask[] {
	// \[\s?(x| )\s?\] matches either [x] or [ ] (with optional spaces inside).
	// \s-\s matches the separator - (a space, dash, space).
	// (.+) captures the message part (anything after the separator).
	const regex = /\[\s?(x| )\s?\]\s-\s(.+)/g;

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
