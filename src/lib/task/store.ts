import type { AnyTask } from '$lib/task/utils';

import { DATE, DATE_FR } from '$lib/consts';
import { getTaskDate } from '$lib/task/time-utils';
import { format, isPast, isToday, isTomorrow, parse, startOfWeek } from 'date-fns';

function isCurrentWeek(date: Date) {
	return startOfWeek(new Date()).getTime() === startOfWeek(date).getTime();
}

function getDateName(task: AnyTask): string {
	const date = getTaskDate(task);

	if ('recurringStartAt' in task) {
		return 'Recurring';
	}

	if (!date) {
		return 'Someday';
	}
	if (isToday(date)) {
		return 'Today';
	}
	if (isTomorrow(date)) {
		return 'Tomorrow';
	}
	if (isCurrentWeek(date)) {
		return 'This week';
	}
	if (isPast(date)) {
		return 'Overdue';
	}
	return format(date, DATE_FR);
}

function sortTasks(tasks: AnyTask[]) {
	return tasks.sort((a, b) => {
		const dateAString = 'date' in a ? a.date : a.deadline;
		const dateBString = 'date' in b ? b.date : b.deadline;

		const dateA = dateAString ? parse(dateAString, DATE, new Date()) : null;
		const dateB = dateBString ? parse(dateBString, DATE, new Date()) : null;
		if (!dateA) {
			return 1;
		}
		if (!dateB) {
			return -1;
		}
		return dateA.getTime() - dateB.getTime();
	});
}

function getTaskByOrderedDate(tasksByDate: Record<string, AnyTask[]>) {
	const priorityObject: Record<string, number> = {
		Overdue: 1,
		Recurring: 7,
		Someday: 6,
		'This week': 4,
		// Rest : 5
		Today: 2,
		Tomorrow: 3,
	};

	function sorting(a: string, b: string) {
		const priorityA = priorityObject[a] || 4;
		const priorityB = priorityObject[b] || 4;

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

function groupTasksByDate(tasks: AnyTask[]): Record<string, AnyTask[]> {
	return tasks.reduce<Record<string, AnyTask[]>>((groups, task) => {
		const date = getDateName(task);

		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(task);
		return groups;
	}, {});
}

export function sortTasksByDate(tasks: AnyTask[]): Record<string, AnyTask[]> & Iterable<string> {
	const sortedTasks = sortTasks(tasks);
	const tasksByDate = groupTasksByDate(sortedTasks);
	return getTaskByOrderedDate(tasksByDate);
}
