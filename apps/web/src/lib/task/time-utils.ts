import { roundTo15 } from '@life/lib/date';
import type { Task } from '@life/lib/task';
import { add, isSameDay, parse } from 'date-fns';

import { DATE, formatTime } from '$lib/date.utils.svelte';

export function getTaskDate(task: Task): Date | null {
	return task.date ? parse(task.date, DATE, new Date()) : null;
}

export function getCurrentRoundedDate() {
	return roundTo15(new Date());
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
