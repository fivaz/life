import { formatTime, parseDate, roundTo15 } from '@life/shared/date';
import type { Task } from '@life/shared/task';
import { add, isSameDay, parse } from 'date-fns';

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
