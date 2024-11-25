import type { Task } from '@life/shared/types';

import type { SubTask } from '$lib/task/task.model';
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

export function getSubTasksCompleted(subtasks: SubTask[]): number {
	return subtasks.filter((subtask) => subtask.isDone).length;
}

export function getDurationInMinutes(task: Task) {
	return convertTimeToMinutes(task.duration);
}

export function sortTasks(tasks: Task[]): Task[] {
	return tasks.toSorted(
		(a, b) => (getTaskDateTime(a)?.getTime() ?? 0) - (getTaskDateTime(b)?.getTime() ?? 0),
	);
}
