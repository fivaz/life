import { convertMinutesToTime, convertTimeToMinutes, GRID_CELL_TIME } from '$lib/date.js';
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

// Parses subtasks from HTML description
function getSubTasks(html: string | undefined): SubTask[] {
	if (!html) return [];

	const regex = /<input type="checkbox"(.*?)><span><\/span><\/label><div><p>(.*?)<\/p>/gis;
	const subTasks: SubTask[] = [];
	let match: RegExpExecArray | null;

	while ((match = regex.exec(html)) !== null) {
		const isChecked = match[1].includes('checked');
		const title = match[2].trim();

		if (title) {
			subTasks.push({
				isDone: isChecked,
				title,
			});
		}
	}

	return subTasks;
}

// Counts completed subtasks
export function getSubTasksCompleted(subtasks: SubTask[]): number {
	return subtasks.filter((subtask) => subtask.isDone).length;
}

// Filters tasks with the same groupId as the input task
function getSiblingTasks(task: Task, tasks: Task[]): Task[] {
	return tasks.filter(
		(existingTask) => existingTask.groupId && existingTask.groupId === task.groupId,
	);
}

// Generates display name with suffix (e.g., "1/3") based on sibling position
function getSiblingName(task: Task, siblings: Task[]): string {
	const sortedSiblings = [...siblings].sort((a, b) => a.startTime.localeCompare(b.startTime));
	const index = sortedSiblings.findIndex((e) => e.id === task.id);
	return index === -1 ? `1/${siblings.length}` : `${index + 1}/${siblings.length}`;
}

// Generates checklist string (e.g., "1/3" for siblings or "2/5" for subtasks)
export function getCheckList(task: Task, tasks: Task[]): string {
	const siblings = getSiblingTasks(task, tasks);
	if (siblings.length > 1) {
		// Only show checklist for multiple siblings
		return ` (${getSiblingName(task, siblings)})`;
	}

	const subtasks = getSubTasks(task.description);
	if (subtasks.length === 0) {
		return '';
	}

	const completedTasks = getSubTasksCompleted(subtasks);
	return ` (${completedTasks}/${subtasks.length})`;
}

// Constructs task title with checklist or ellipsis as needed
export function getTaskTitle(task: Task): string {
	let title = task.name;
	if (task.description) {
		title += '...';
	}
	return title;
}
