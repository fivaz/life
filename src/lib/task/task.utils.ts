import type { SubTask, Task } from '$lib/task/task.model';
import { convertTimeToMinutes, getTaskDateTime } from '$lib/task/time-utils';

export function getSubTasks(task: Task): SubTask[] {
	// \[\s?([x ])\s?\] matches either [x] or [ ] (with optional spaces inside).
	// \s-\s matches the separator - (a space, dash, space).
	// (.+) captures the message part (anything after the separator).
	const regex = /\[\s?([x ])\s?]\s-\s(.+)/g;

	let match: RegExpExecArray | null;
	const subTasks: { isDone: boolean; title: string }[] = [];

	while ((match = regex.exec(task.description)) !== null) {
		subTasks.push({
			isDone: match[1].toLowerCase() === 'x',
			title: match[2].trim(),
		});
	}

	return subTasks;
}

export function getCompletedTasks(subtasks: SubTask[]): number {
	return subtasks.filter((subtask) => subtask.isDone).length;
}

export function getDurationInMinutes(task: Task) {
	return convertTimeToMinutes(task.duration);
}

export function sortTasks<T extends Task>(tasks: T[]): T[] {
	return tasks.toSorted((a, b) => {
		const dateA = getTaskDateTime(a);

		const dateB = getTaskDateTime(b);

		if (!dateA && !dateB) {
			return 0;
		}

		if (!dateA) {
			return 1;
		}

		if (!dateB) {
			return -1;
		}

		return dateA.getTime() - dateB.getTime();
	});
}