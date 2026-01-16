import { parseDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { sortTasks } from '@life/shared/task';
import {
	addWeeks,
	endOfWeek,
	format,
	isPast,
	isThisWeek,
	isToday,
	isTomorrow,
	isWithinInterval,
	startOfWeek,
} from 'date-fns';

import { DATE_FR } from '$lib/utils.svelte';

// Helper: determine if a date falls within next week relative to "now"
function isNextWeek(date: Date): boolean {
	const now = new Date();
	const start = addWeeks(startOfWeek(now), 1);
	const end = endOfWeek(start);

	return isWithinInterval(date, { start, end });
}

export type TaskListType =
	| 'overdue'
	| 'today'
	| 'tomorrow'
	| 'thisWeek'
	| 'nextWeek'
	| 'someday'
	| 'recurringDaily'
	| 'recurringWeekly'
	| 'recurringMonthly'
	| 'recurringYearly';

export type TaskLists = Record<TaskListType, Task[]> & Record<string, Task[]>;

export function getTaskLists(tasks: Task[]) {
	// Buckets we always want to show, even if empty
	const alwaysShow: TaskListType[] = ['today', 'tomorrow', 'thisWeek', 'nextWeek', 'someday'];

	const lists: Partial<TaskLists> = {};

	// Sort once before splitting into buckets so ordering is stable when tasks are placed into lists
	const sortedTasks = sortTasks(tasks);

	const recurringHandlers = {
		daily: (task: Task) => (lists.recurringDaily ??= []).push(task),
		weekly: (task: Task) => (lists.recurringWeekly ??= []).push(task),
		monthly: (task: Task) => (lists.recurringMonthly ??= []).push(task),
		yearly: (task: Task) => (lists.recurringYearly ??= []).push(task),
	};

	const dateHandlers = [
		{ check: (date: Date) => isPast(date) && !isToday(date), period: 'overdue' as TaskListType },
		{ check: isToday, period: 'today' as TaskListType },
		{ check: isTomorrow, period: 'tomorrow' as TaskListType },
		{ check: isThisWeek, period: 'thisWeek' as TaskListType },
		{ check: isNextWeek, period: 'nextWeek' as TaskListType },
	];

	for (const task of sortedTasks) {
		if (task.recurringFrequency) {
			const handler = recurringHandlers[task.recurringFrequency];
			if (handler) handler(task);
			continue;
		}

		if (!task.date) {
			(lists.someday ??= []).push(task);
			continue;
		}

		const date = parseDate(task.date);

		const handler = dateHandlers.find((h) => h.check(date));
		if (handler) {
			(lists[handler.period] ??= []).push(task);
		} else {
			const formatted = format(date, DATE_FR);
			(lists[formatted] ??= []).push(task);
		}
	}

	// Ensure alwaysShow buckets exist
	for (const bucket of alwaysShow) {
		// Special case: only show "thisWeek" if last day isn't today or tomorrow
		if (bucket === 'thisWeek') {
			const endOfCurrentWeek = endOfWeek(new Date());
			if (isToday(endOfCurrentWeek) || isTomorrow(endOfCurrentWeek)) {
				continue; // skip creating the bucket entirely
			}
		}

		if (!(bucket in lists)) {
			lists[bucket] = [];
		}
	}

	return lists as TaskLists;
}
