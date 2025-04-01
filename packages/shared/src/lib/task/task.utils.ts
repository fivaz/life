import { parse } from 'date-fns';

import {
	convertMinutesToTime,
	convertTimeToMinutes,
	DATE,
	GRID_CELL_TIME,
	TIME,
} from '$lib/date.js';
import type { SubTask, Task } from '$lib/task/task.model.js';

export function isTimed(task: Omit<Task, 'id'> | Task) {
	return !!task.startTime;
}

export function isUntimed(task: Omit<Task, 'id'> | Task) {
	return !task.startTime;
}

export function isRecurring(task: Omit<Task, 'id'> | Task) {
	return !!task.recurringFrequency;
}

export function getDurationInMinutes(task: Task) {
	return convertTimeToMinutes(task.duration);
}

export function getSubTasks(html: string): { isDone: boolean; title: string }[] {
	const regex = /<input type="checkbox"(?:\s+checked)?\s*>([^<]+)/gi;
	let match: RegExpExecArray | null;
	const subTasks: { isDone: boolean; title: string }[] = [];

	while ((match = regex.exec(html)) !== null) {
		subTasks.push({
			isDone: match[0].includes('checked'),
			title: match[1].trim(),
		});
	}
	return subTasks;
}

export function getSubTasksCompleted(subtasks: SubTask[]): number {
	return subtasks.filter((subtask) => subtask.isDone).length;
}

export function getTotalDuration(tasks: Task[]): string {
	const totalDurationInMinutes = tasks.reduce((sum, task) => sum + getDurationInMinutes(task), 0);
	return convertMinutesToTime(totalDurationInMinutes);
}

export function getHalfTime(time: string): string {
	const [hours, minutes] = time.split(':').map(Number);
	const totalMinutes = hours * 60 + minutes;
	const halfMinutes = totalMinutes / 2;

	const roundedHalfMinutes = Math.round(halfMinutes / GRID_CELL_TIME) * GRID_CELL_TIME;

	const halfHours = Math.floor(roundedHalfMinutes / 60);

	const remainingInMinutes = Math.round(roundedHalfMinutes % 60);

	return `${String(halfHours).padStart(2, '0')}:${String(remainingInMinutes).padStart(2, '0')}`;
}

export function sortTasks(tasks: Task[]): Task[] {
	return tasks.toSorted((a, b) => {
		// Helper function to parse the date into a comparable timestamp
		const parseDate = (obj: Task): number | null =>
			obj.date ? new Date(obj.date).getTime() : null;

		// Helper function to handle empty startTime as "00:00"
		const parseTime = (time: string): string => time || '00:00';

		const aDate = parseDate(a);
		const bDate = parseDate(b);

		// Handle objects with no valid date (date and startTime empty)
		if (aDate === null && bDate === null) return 0; // Both invalid, keep order
		if (aDate === null) return -1; // `a` comes first
		if (bDate === null) return 1; // `b` comes first

		// Compare by date
		if (aDate !== bDate) return aDate - bDate;

		// Handle objects with the same date:
		// Those with no startTime (or empty startTime) come first
		if (!a.startTime && b.startTime) return -1;
		if (a.startTime && !b.startTime) return 1;

		// Compare by time if both have startTime
		const aTime = parseTime(a.startTime);
		const bTime = parseTime(b.startTime);

		return aTime.localeCompare(bTime);
	});
}

export function getTaskDateTime(task: Task): Date | null {
	if (!task.date) return null;

	if (isTimed(task)) {
		return parse(`${task.date} ${task.startTime}`, `${DATE} ${TIME}`, new Date());
	} else {
		return parse(task.date, DATE, new Date());
	}
}
