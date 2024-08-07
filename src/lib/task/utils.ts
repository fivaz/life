import type { Category } from '$lib/category/utils';
import type { Goal } from '$lib/goal/utils';

import { DbPaTH } from '$lib/consts';
import { db } from '$lib/firebase';
import { convertTimeToMinutes, getTaskDateTime } from '$lib/task/time-utils';
import { type Query, collection, query, where } from 'firebase/firestore';

export type SubTask = { id: number; isDone: boolean; name: string };

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
