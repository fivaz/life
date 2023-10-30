import { DATE, TIME } from '$lib/utils';
import { addMinutes, format, formatISO, parse } from 'date-fns';
import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/$types';

export function getISODate(date: string | File | null, time: string | File | null) {
	return formatISO(new Date(`${date}T${time}:00`));
}

export function updateDates(formData: FormData) {
	const startTime = formData.get('startTime');
	const endTime = formData.get('endTime');
	const date = formData.get('date');
	formData.set('startDate', getISODate(date, startTime));
	formData.set('endDate', getISODate(date, endTime));
}

export function getDate(form: ActionData): string {
	if (form?.saved) {
		return format(form.saved.startDate, DATE);
	} else {
		return format(new Date(), DATE);
	}
}

export function getStartTime(form: ActionData): string {
	if (form?.saved) {
		return format(form.saved.startDate, TIME);
	} else {
		return format(new Date(), TIME);
	}
}

export function getEndTime(form: ActionData): string {
	if (form?.saved) {
		return format(form.saved.endDate, TIME);
	} else {
		return format(addMinutes(new Date(), 15), TIME);
	}
}

export function add15Minutes(time: string) {
	try {
		const date = parse(time, TIME, new Date());

		const date15MinutesLater = addMinutes(date, 15);

		return format(date15MinutesLater, TIME);
	} catch (e) {
		console.warn(e);
		return '';
	}
}
