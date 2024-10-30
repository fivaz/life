import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service.svelte';
import { DATE, TIME } from '$lib/consts';
import { type Task, getDurationInMinutes, isToDo } from '$lib/task/utils';
import { parse, set } from 'date-fns';

export function getTotalDuration(tasks: Task[]): string {
	const totalDurationInMinutes = tasks.reduce((sum, task) => sum + getDurationInMinutes(task), 0);
	return convertMinutesToTime(totalDurationInMinutes);
}

export function getTaskDate(task: Task): Date | null {
	const dateString = isToDo(task) ? task.deadline : task.date;

	return dateString ? parse(dateString, DATE, new Date()) : null;
}

export function getTaskDateTime(task: Task): Date {
	if (isToDo(task)) {
		return parse(task.deadline, DATE, new Date());
	} else {
		return parse(`${task.date} ${task.startTime}`, `${DATE} ${TIME}`, new Date());
	}
}

export function buildDate(date: Date, time: string): Date {
	const [hours, minutes] = time.split(':').map(Number);

	return set(date, { hours, minutes });
}

export function convertTimeToMinutes(time: string): number {
	if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
		const [hours, minutes] = time.split(':').map(Number);
		return hours * 60 + minutes;
	}
	throw new Error("Time isn't in the format hh:mm");
}

export function convertMinutesToTime(time: number): string {
	const hours = Math.floor(time / 60);
	const minutes = time % 60;

	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function getCurrentRoundedDate() {
	return roundTo15(new Date());
}

export function roundTo15(date: Date) {
	const milliseconds = 1000 * 60 * GRID_CELL_TIME;
	return new Date(Math.round(date.getTime() / milliseconds) * milliseconds);
}
