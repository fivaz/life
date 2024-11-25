import type { Task } from '@life/shared/types';
import { add, isSameDay, parse, set } from 'date-fns';

import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
import { DATE, formatTime, TIME } from '$lib/date.utils.svelte';
import { isTimed } from '$lib/task/task.model';
import { getDurationInMinutes } from '$lib/task/task.utils';

export function getTotalDuration(tasks: Task[]): string {
	const totalDurationInMinutes = tasks.reduce((sum, task) => sum + getDurationInMinutes(task), 0);
	return convertMinutesToTime(totalDurationInMinutes);
}

export function getTaskDate(task: Task): Date | null {
	return task.date ? parse(task.date, DATE, new Date()) : null;
}

export function getTaskDateTime(task: Task): Date | null {
	if (!task.date) return null;

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

// convert time from HH:mm format to the number of minutes
export function convertTimeToMinutes(time: string): number {
	const [hours, minutes] = time.split(':').map(Number);
	if (!isNaN(hours) && !isNaN(minutes)) {
		return hours * 60 + minutes;
	}
	throw new Error("Time isn't in the format HH:mm");
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

export function sumTimes(startTime: string, duration: string): string | '' {
	if (!startTime || !duration) {
		return '';
	}

	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [durationHours, durationMinutes] = duration.split(':').map(Number);

	const startTimeDate = new Date(1, 0, 0, startTimeHours, startTimeMinutes);

	const endDate = add(startTimeDate, { hours: durationHours, minutes: durationMinutes });

	if (isSameDay(startTimeDate, endDate)) {
		return formatTime(endDate);
	}

	return '23:59';
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
