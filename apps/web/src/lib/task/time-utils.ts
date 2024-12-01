import { formatTime } from '@life/shared/date';
import { add, isSameDay } from 'date-fns';

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
