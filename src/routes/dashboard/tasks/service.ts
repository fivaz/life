import type { AnyTask } from '$lib/task/utils';

import { DATE_FR } from '$lib/consts';
import { db } from '$lib/firebase';
import { getTaskDate } from '$lib/task/time-utils';
import { sortTasks } from '$lib/task/utils';
import {
	addWeeks,
	endOfWeek,
	format,
	isPast,
	isToday,
	isTomorrow,
	isWithinInterval,
	startOfWeek,
} from 'date-fns';
import { type Query, collection, query, where } from 'firebase/firestore';

export type SortedTaskType = Record<string, AnyTask[]> & Iterable<string>;

export function queryUncompletedTasks(userId: string) {
	const tasksRef = collection(db, `users/${userId}/tasks`);
	return query(tasksRef, where('isDone', '==', false)) as Query<AnyTask>;
}

enum GROUPS {
	NextWeek = 'Next week',
	Overdue = 'Overdue',
	Recurring = 'Recurring',
	Someday = 'Someday',
	Today = 'Today',
	Tomorrow = 'Tomorrow',
	Week = 'This week',
}

function isCurrentWeek(date: Date) {
	return startOfWeek(new Date()).getTime() === startOfWeek(date).getTime();
}

function isNextWeek(date: Date): boolean {
	const now = new Date();
	const start = addWeeks(startOfWeek(now, { weekStartsOn: 1 }), 1);
	const end = endOfWeek(start, { weekStartsOn: 1 });

	return isWithinInterval(date, { end, start });
}

function getDateName(task: AnyTask): GROUPS | string {
	const date = getTaskDate(task);

	if ('recurringStartAt' in task) {
		return GROUPS.Recurring;
	}
	if (!date) {
		return GROUPS.Someday;
	}
	if (isToday(date)) {
		return GROUPS.Today;
	}
	if (isPast(date)) {
		return GROUPS.Overdue;
	}
	if (isTomorrow(date)) {
		return GROUPS.Tomorrow;
	}
	if (isCurrentWeek(date)) {
		return GROUPS.Week;
	}
	if (isNextWeek(date)) {
		return GROUPS.NextWeek;
	}
	return format(date, DATE_FR);
}

function groupTasksByDate(tasks: AnyTask[]): Record<string, AnyTask[]> {
	return tasks.reduce<Record<string, AnyTask[]>>(
		(groups, task) => {
			const date = getDateName(task);

			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(task);
			return groups;
		},
		{
			[GROUPS.NextWeek]: [],
			[GROUPS.Someday]: [],
			[GROUPS.Today]: [],
			[GROUPS.Tomorrow]: [],
			[GROUPS.Week]: [],
			['Test']: [],
		},
	);
}

function getTaskByOrderedDate(tasksByDate: Record<string, AnyTask[]>) {
	const priorityObject: Record<string, number> = {
		[GROUPS.NextWeek]: 5,
		[GROUPS.Overdue]: 1,
		[GROUPS.Recurring]: 8,
		// Rest : 6
		[GROUPS.Someday]: 7,
		[GROUPS.Today]: 2,
		[GROUPS.Tomorrow]: 3,
		[GROUPS.Week]: 4,
	};

	function sorting(a: string, b: string) {
		// 5 is the Number representing the rest
		const priorityA = priorityObject[a] || 5;
		const priorityB = priorityObject[b] || 5;

		return priorityA - priorityB;
	}

	return {
		[Symbol.iterator]: function* () {
			const sortedKeys = Object.keys(this).sort(sorting);
			for (const key of sortedKeys) {
				yield key;
			}
		},
		...tasksByDate,
	};
}

export function sortTasksByDate(tasks: AnyTask[]): Record<string, AnyTask[]> & Iterable<string> {
	const sortedTasks = sortTasks(tasks);
	const tasksByDate = groupTasksByDate(sortedTasks);
	return getTaskByOrderedDate(tasksByDate);
}
