import { formatDate, parseDate } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import {
	addWeeks,
	endOfWeek,
	isPast,
	isThisWeek,
	isToday,
	isTomorrow,
	isWithinInterval,
	startOfWeek,
} from 'date-fns';

function isNextWeek(date: Date): boolean {
	const now = new Date();
	const start = addWeeks(startOfWeek(now), 1);
	const end = endOfWeek(start);

	return isWithinInterval(date, { end, start });
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
	const lists: TaskLists = {
		overdue: [],
		today: [],
		tomorrow: [],
		thisWeek: [],
		nextWeek: [],
		someday: [],
		recurringDaily: [],
		recurringWeekly: [],
		recurringMonthly: [],
		recurringYearly: [],
	};

	for (const task of tasks) {
		if (task.recurringFrequency) {
			if (task.recurringFrequency === 'daily') lists.recurringDaily.push(task);
			else if (task.recurringFrequency === 'weekly') lists.recurringWeekly.push(task);
			else if (task.recurringFrequency === 'monthly') lists.recurringMonthly.push(task);
			else if (task.recurringFrequency === 'yearly') lists.recurringYearly.push(task);
			continue;
		}

		if (!task.date) {
			lists.someday.push(task);
			continue;
		}

		const date = parseDate(task.date);

		if (isPast(date) && !isToday(date)) {
			lists.overdue.push(task);
		} else if (isToday(date)) {
			lists.today.push(task);
		} else if (isTomorrow(date)) {
			lists.tomorrow.push(task);
		} else if (isThisWeek(date)) {
			lists.thisWeek.push(task);
		} else if (isNextWeek(date)) {
			lists.nextWeek.push(task);
		} else {
			const formatted = formatDate(date);
			if (!lists[formatted]) {
				lists[formatted] = [];
			}
			lists[formatted].push(task);
		}
	}

	return lists;
}
