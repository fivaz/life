import { addMinutes, differenceInMilliseconds, format, parse, set, startOfMinute } from 'date-fns';

export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export function formatDate(date: Date): string {
	return format(date, DATE);
}

export function parseDate(date: string): Date {
	return parse(date, DATE, new Date());
}

export function formatTime(date: Date): string {
	return format(date, TIME);
}

export function parseTime(date: string): Date {
	return parse(date, TIME, new Date());
}

export const GRID_CELL_TIME = 15;

// Rounds up to next 15-minute interval
export function ceilingRound15(date: Date): Date {
	const minutes = date.getMinutes();
	const remainder = minutes % 15;
	const minutesToAdd = remainder === 0 ? 0 : 15 - remainder;

	return startOfMinute(addMinutes(date, minutesToAdd));
}

// Rounds down to previous 15-minute interval
export function floorRound15(date: Date): Date {
	const minutes = date.getMinutes();
	const minutesToSubtract = minutes % 15;

	return startOfMinute(addMinutes(date, -minutesToSubtract));
}

// Rounds to nearest 15-minute interval
export function averageRound15(date: Date): Date {
	const minutes = date.getMinutes();
	const remainder = minutes % 15;

	if (remainder < 7.5) {
		return startOfMinute(addMinutes(date, -remainder));
	} else {
		return startOfMinute(addMinutes(date, 15 - remainder));
	}
}

export function buildDate(date: Date, time: string): Date {
	const [hours, minutes] = time.split(':').map(Number);

	return set(date, { hours, minutes });
}

export function convertMinutesToTime(timeInMinutes: number): string {
	const hours = Math.floor(timeInMinutes / 60);
	const minutes = timeInMinutes % 60;

	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// convert time from HH:mm format to the number of minutes
export function convertTimeToMinutes(time: string): number {
	const [hours, minutes] = time.split(':').map(Number);
	if (!isNaN(hours) && !isNaN(minutes)) {
		return hours * 60 + minutes;
	}
	throw new Error("Time isn't in the format HH:mm");
}

export function getDateRoundDownTo15() {
	const milliseconds = 1000 * 60 * GRID_CELL_TIME;
	return new Date(Math.floor(new Date().getTime() / milliseconds) * milliseconds);
}

export function getNextRoundedTime() {
	const now = new Date();

	const currentTimeMilliseconds = now.getTime();

	const roundedMilliseconds = 1000 * 60 * GRID_CELL_TIME;
	const nextTimeRounded =
		Math.ceil(currentTimeMilliseconds / roundedMilliseconds) * roundedMilliseconds;

	return differenceInMilliseconds(nextTimeRounded, currentTimeMilliseconds);
}

export const nameOfDaysOfWeek: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
