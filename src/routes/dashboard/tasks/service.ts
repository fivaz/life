import type { Task } from '$lib/task/utils';

import { DATE_FR } from '$lib/consts';
import { getTaskDate } from '$lib/task/time-utils';
import { isRecurring, sortTasks } from '$lib/task/utils';
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

export type SortedTaskType = Record<string, Task[]> & Iterable<string>;

export enum GROUPS {
	NextWeek = 'Next week',
	Overdue = 'Overdue',
	Recurring = 'Recurring',
	Someday = 'Someday',
	Today = 'Today',
	Tomorrow = 'Tomorrow',
	Week = 'This week',
}

function isCurrentWeek(date: Date) {
	return (
		startOfWeek(new Date(), { weekStartsOn: 1 }).getTime() ===
		startOfWeek(date, { weekStartsOn: 1 }).getTime()
	);
}

function isNextWeek(date: Date): boolean {
	const now = new Date();
	const start = addWeeks(startOfWeek(now, { weekStartsOn: 1 }), 1);
	const end = endOfWeek(start, { weekStartsOn: 1 });

	return isWithinInterval(date, { end, start });
}

function getDateName(task: Task): GROUPS | string {
	const date = getTaskDate(task);

	if (isRecurring(task)) {
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

function groupTasksByDate(tasks: Task[]): Record<string, Task[]> {
	return tasks.reduce<Record<string, Task[]>>(
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
		},
	);
}

function getTaskByOrderedDate(tasksByDate: Record<string, Task[]>): SortedTaskType {
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
		const priorityA = priorityObject[a] || 6;
		const priorityB = priorityObject[b] || 6;

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

export function sortTasksByDate(tasks: Task[]): SortedTaskType {
	const sortedTasks = sortTasks(tasks);
	const tasksByDate = groupTasksByDate(sortedTasks);
	return getTaskByOrderedDate(tasksByDate);
}
