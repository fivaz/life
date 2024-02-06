import type { AnyTask } from '$lib/task/utils';

import { DATE, DATE_FR } from '$lib/consts';
import { format, isPast, isToday, isTomorrow, parse, startOfWeek } from 'date-fns';

function isCurrentWeek(date: Date) {
	return startOfWeek(new Date()).getTime() === startOfWeek(date).getTime();
}

function getDateName(task: AnyTask): string {
	const date = parse('date' in task ? task.date : task.deadline, DATE, new Date());

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
		const dateA = parse('date' in a ? a.date : a.deadline, DATE, new Date());
		const dateB = parse('date' in b ? b.date : b.deadline, DATE, new Date());
		if (!dateA) {
			return 1;
		}
		if (!dateB) {
			return -1;
		}
		return dateA.getTime() - dateB.getTime();
	});
}

export function getTasksByDate(tasks: AnyTask[]): Record<string, AnyTask[]> {
	const sortedTasks = sortTasks(tasks);
	return groupTasksByDate(sortedTasks);
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
