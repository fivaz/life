import { add, format, isSameDay, parse, set } from 'date-fns';

import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service.svelte';
import { DATE, TIME } from '$lib/consts';
import { getDurationInMinutes, isTimed, type Task } from '$lib/task/utils';

export function getTotalDuration(tasks: Task[]): string {
	const totalDurationInMinutes = tasks.reduce((sum, task) => sum + getDurationInMinutes(task), 0);
	return convertMinutesToTime(totalDurationInMinutes);
}

export function getTaskDate(task: Task): Date | null {
	return task.date ? parse(task.date, DATE, new Date()) : null;
}

export function getTaskDateTime(task: Task): Date {
	if (isTimed(task)) {
		return parse(`${task.date} ${task.startTime}`, `${DATE} ${TIME}`, new Date());
	} else {
		return parse(task.date, DATE, new Date());
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

export function convertMinutesToTime(timeInMinutes: number): string {
	const hours = Math.floor(timeInMinutes / 60);
	const minutes = timeInMinutes % 60;

	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function getCurrentRoundedDate() {
	return roundTo15(new Date());
}

export function getDateRoundDownTo15() {
	const milliseconds = 1000 * 60 * GRID_CELL_TIME;
	return new Date(Math.floor(new Date().getTime() / milliseconds) * milliseconds);
}

export function roundTo15(date: Date) {
	const milliseconds = 1000 * 60 * GRID_CELL_TIME;
	return new Date(Math.round(date.getTime() / milliseconds) * milliseconds);
}

export function sumTimes(startTime: string, duration: string): string {
	if (!startTime || !duration) {
		return '';
	}

	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [durationHours, durationMinutes] = duration.split(':').map(Number);

	const startTimeDate = new Date(1, 0, 0, startTimeHours, startTimeMinutes);

	const endDate = add(startTimeDate, { hours: durationHours, minutes: durationMinutes });

	if (isSameDay(startTimeDate, endDate)) {
		return format(endDate, TIME);
	}

	return '23:59';
}

export function getHalfTime(time: string) {
	const [hours, minutes] = time.split(':').map(Number);
	const totalMinutes = hours * 60 + minutes;
	const halfMinutes = totalMinutes / 2;

	const roundedHalfMinutes = Math.round(halfMinutes / GRID_CELL_TIME) * GRID_CELL_TIME;

	const halfHours = Math.floor(roundedHalfMinutes / 60);

	const remainingInMinutes = Math.round(roundedHalfMinutes % 60);

	return `${String(halfHours).padStart(2, '0')}:${String(remainingInMinutes).padStart(2, '0')}`;
}
