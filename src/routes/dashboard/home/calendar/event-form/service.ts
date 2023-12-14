import { TIME } from '$lib/utils';
import { add, differenceInMinutes, format, isValid, parse } from 'date-fns';

export function getEndTime(startTime: string, duration: string): string {
	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [DurationHours, durationMinutes] = duration.split(':').map(Number);

	const startTimeDate = new Date(1, 0, 0, startTimeHours, startTimeMinutes);

	const totalDate = add(startTimeDate, { hours: DurationHours, minutes: durationMinutes });
	return format(totalDate, TIME);
}

export function getDuration(startTime: string, endTime: string): string {
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

	const startDateString = `${date} ${startTime}`;
	const endDateString = `${date} ${endTime}`;

	// Parse the date and time string
	const startDate = parse(startDateString, 'yyyy-MM-dd HH:mm', new Date());
	const endDate = parse(endDateString, 'yyyy-MM-dd HH:mm', new Date());

	if (!isValid(startDate) || !isValid(endDate)) {
		throw Error('date, startTime and endTime should be valid date and time');
	}

	formData.set('startDate', startDate.toISOString());
	formData.set('endDate', endDate.toISOString());
}
