import { DATE, DATETIME, TIME } from '$lib/consts';
import { add, differenceInMinutes, format, isAfter, isValid, parse } from 'date-fns';
import type { TaskIn } from '../service';

export function getEndTime(startTime: string, duration: string): string {
	if (!startTime || !duration) {
		return '';
	}
	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [DurationHours, durationMinutes] = duration.split(':').map(Number);

	const startTimeDate = new Date(1, 0, 0, startTimeHours, startTimeMinutes);

	const totalDate = add(startTimeDate, { hours: DurationHours, minutes: durationMinutes });
	return format(totalDate, TIME);
}

export function getDuration(startTime: string, endTime: string): string {
	if (!startTime || !endTime) {
		return '';
	}
	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [endTimeHours, endTimeMinutes] = endTime.split(':').map(Number);

	const startTimeDate = new Date(0, 0, 0, startTimeHours, startTimeMinutes);
	const endTimeDate = new Date(0, 0, 0, endTimeHours, endTimeMinutes);

	const totalMinutes = differenceInMinutes(endTimeDate, startTimeDate);
	const totalHours = Math.floor(totalMinutes / 60);
	const remainingMinutes = totalMinutes % 60;

	return format(new Date(0, 0, 0, totalHours, remainingMinutes), TIME);
}

export function buildDates(formData: FormData): void {
	const date = formData.get('date') as string;
	const startTime = formData.get('startTime') as string;
	const endTime = formData.get('endTime') as string;
	const isRecurring = !!formData.get('isRecurring');

	const startDateString = `${date} ${startTime}`;
	const endDateString = `${date} ${endTime}`;

	// Parse the date and time string
	const startDate = parse(startDateString, DATETIME, new Date());
	const endDate = parse(endDateString, DATETIME, new Date());

	if (!isValid(startDate) || !isValid(endDate)) {
		throw Error('date, startTime and endTime should be valid date and time');
	}

	formData.set('startDate', startDate.toISOString());
	formData.set('endDate', endDate.toISOString());

	if (isRecurring) {
		const recurringStartAtString = formData.get('recurringStartAt') as string;
		const recurringEndAtString = formData.get('recurringEndAt') as string;
		const recurringStartAt = parse(recurringStartAtString, DATE, new Date());
		const recurringEndAt = parse(recurringEndAtString, DATE, new Date());

		if (!isValid(recurringStartAt) || !isValid(recurringEndAt)) {
			throw Error('date, recurringStartAt and recurringEndAt should be valid date and time');
		}

		formData.set('recurringStartAt', recurringStartAt.toISOString());
		formData.set('recurringEndAt', recurringEndAt.toISOString());
	}
}

export function isEventsDateInverted(task: TaskIn) {
	return (
		task.isEvent &&
		!isAfter(parse(task.endTime, TIME, new Date()), parse(task.startTime, TIME, new Date()))
	);
}
