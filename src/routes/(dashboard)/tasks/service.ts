import type { Task } from '$lib/task/utils';

import { DATE_FR } from '$lib/consts';
import { getTaskDate } from '$lib/task/time-utils';
import { isRecurring } from '$lib/task/utils';
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
	Overdue = 'Overdue',
	Today = 'Today',
	Tomorrow = 'Tomorrow',
	Week = 'This week',
	NextWeek = 'Next week',
	Someday = 'Someday',
	DailyRecurring = 'Recurring Daily',
	MonthlyRecurring = 'Monthly Recurring',
	YearlyRecurring = 'Yearly Recurring',
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
		if (task.recurringFrequency === 'yearly') {
			return GROUPS.YearlyRecurring;
		}
		if (task.recurringFrequency === 'monthly') {
			return GROUPS.MonthlyRecurring;
		}
		if (task.recurringFrequency === 'daily') {
			return GROUPS.DailyRecurring;
		}
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
	const tasksByDate = Object.groupBy(tasks, getDateName) as Record<string, Task[]>;

	const groupOfDates = {
		[GROUPS.NextWeek]: [],
		[GROUPS.Someday]: [],
		[GROUPS.Today]: [],
		[GROUPS.Tomorrow]: [],
		[GROUPS.Week]: [],
	};

	return Object.assign(groupOfDates, tasksByDate);
}

function groupTaskByDateSorted(tasksByDate: Record<string, Task[]>): SortedTaskType {
	const dateHashMap: Record<string, number> = {
		[GROUPS.Overdue]: 1,
		[GROUPS.Today]: 2,
		[GROUPS.Tomorrow]: 3,
		[GROUPS.Week]: 4,
		[GROUPS.NextWeek]: 5,
		// Rest : 6
		[GROUPS.Someday]: 7,
		[GROUPS.DailyRecurring]: 8,
		[GROUPS.MonthlyRecurring]: 9,
		[GROUPS.YearlyRecurring]: 10,
	};

	function sorting(a: string, b: string) {
		const priorityA = dateHashMap[a] || 6;
		const priorityB = dateHashMap[b] || 6;

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

export function getTasksByDateSorted(tasks: Task[]): SortedTaskType {
	const tasksByDate = groupTasksByDate(tasks);
	return groupTaskByDateSorted(tasksByDate);
}
