import { DATE } from '$lib/consts';
import { type AnyTask } from '$lib/task/utils';
import { parse, set } from 'date-fns';

export function getTaskDate(task: AnyTask) {
	const dateString = 'date' in task ? task.date : task.deadline;

	return dateString ? parse(dateString, DATE, new Date()) : null;
}

export function buildDate(date: Date, time: string): Date {
	const [hours, minutes] = time.split(':').map(Number);

	return set(date, { hours, minutes });
}

export function convertTimeToMinutes(time: string) {
	if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
		const [hours, minutes] = time.split(':').map(Number);
		return hours * 60 + minutes;
	}
	throw "Time isn't in the format hh:mm";
}
