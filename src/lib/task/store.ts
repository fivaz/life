import { DATE, DATE_FR } from '$lib/consts';
import type { Task } from '$lib/task/utils';
import { format, isPast, isToday, isTomorrow, parse, startOfWeek } from 'date-fns';

function isCurrentWeek(date: Date) {
	return startOfWeek(new Date()).getTime() === startOfWeek(date).getTime();
}

function getDateName(task: Task): string {
	const date = parse('date' in task && task.date ? task.date : task.deadline, DATE, new Date());

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

function sortTasks(tasks: Task[]) {
	return tasks.sort((a, b) => {
		const dateA = parse('date' in a && a.date ? a.date : a.deadline, DATE, new Date());
		const dateB = parse('date' in b && a.date ? b.date : b.deadline, DATE, new Date());
		if (!dateA) {
			return 1;
		}
		if (!dateB) {
			return -1;
		}
		return dateA.getTime() - dateB.getTime();
	});
}

export function getTasksByDate(tasks: Task[]): Record<string, Task[]> {
	const sortedTasks = sortTasks(tasks);
	return groupTasksByDate(sortedTasks);
}

function groupTasksByDate(tasks: Task[]): Record<string, Task[]> {
	return tasks.reduce<Record<string, Task[]>>((groups, toDo) => {
		const date = getDateName(toDo);

		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(toDo);
		return groups;
	}, {});
}
