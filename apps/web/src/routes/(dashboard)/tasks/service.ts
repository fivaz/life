import { parseDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { isRecurring } from '@life/shared/task';
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

import { groupBy } from '$lib/utils';
import { DATE_FR } from '$lib/utils.svelte';

export type SortedTaskType = Record<string, Task[]> & Iterable<string>;

export enum GROUPS {
	Overdue = 'Overdue',
	Today = 'Today',
	Tomorrow = 'Tomorrow',
	ThisWeek = 'This week',
	NextWeek = 'Next week',
	Someday = 'Someday',
	DailyRecurring = 'Recurring Daily',
	MonthlyRecurring = 'Monthly Recurring',
	YearlyRecurring = 'Yearly Recurring',
}

function isCurrentWeek(date: Date) {
	return startOfWeek(new Date()).getTime() === startOfWeek(date).getTime();
}

function isNextWeek(date: Date): boolean {
	const now = new Date();
	const start = addWeeks(startOfWeek(now), 1);
	const end = endOfWeek(start);

	return isWithinInterval(date, { end, start });
}

function getDateName(task: Task): GROUPS | string {
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

	if (!task.date) {
		return GROUPS.Someday;
	}

	const date = parseDate(task.date);

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
		return GROUPS.ThisWeek;
	}
	if (isNextWeek(date)) {
		return GROUPS.NextWeek;
	}
	return format(date, DATE_FR);
}

function groupTasksByDate(tasks: Task[]): Record<string, Task[]> {
	const tasksByDate = groupBy(tasks, getDateName);

	// minimum amount of groups I must have even if they will remain empty
	const groupOfDates: Record<string, Task[]> = {
		[GROUPS.Today]: [],
		[GROUPS.Tomorrow]: [],
		[GROUPS.ThisWeek]: [],
		[GROUPS.NextWeek]: [],
		[GROUPS.Someday]: [],
	};

	return Object.assign(groupOfDates, tasksByDate);
}

function groupTaskByDateSorted(tasksByDate: Record<string, Task[]>): SortedTaskType {
	const dateHashMap: Record<string, number> = {
		[GROUPS.Overdue]: 1,
		[GROUPS.Today]: 2,
		[GROUPS.Tomorrow]: 3,
		[GROUPS.ThisWeek]: 4,
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
