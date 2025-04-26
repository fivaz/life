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

	const recurringHandlers = {
		daily: (task: Task) => lists.recurringDaily.push(task),
		weekly: (task: Task) => lists.recurringWeekly.push(task),
		monthly: (task: Task) => lists.recurringMonthly.push(task),
		yearly: (task: Task) => lists.recurringYearly.push(task),
	};

	const dateHandlers = [
		{ check: (date: Date) => isPast(date) && !isToday(date), period: 'overdue' },
		{ check: isToday, period: 'today' },
		{ check: isTomorrow, period: 'tomorrow' },
		{ check: isThisWeek, period: 'thisWeek' },
		{ check: isNextWeek, period: 'nextWeek' },
	];

	for (const task of tasks) {
		if (task.recurringFrequency) {
			const handler = recurringHandlers[task.recurringFrequency];
			if (handler) handler(task);
			continue;
		}

		if (!task.date) {
			lists.someday.push(task);
			continue;
		}

		const date = parseDate(task.date);

		const handler = dateHandlers.find((h) => h.check(date));
		if (handler) {
			lists[handler.period].push(task);
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
