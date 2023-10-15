import type { TEvent } from '$lib';
import { format, formatISO } from 'date-fns';

export type EventIn = {
	id: number;
	name: string;
	description: string | null;
	isDone: boolean;
	startTime: string;
	endTime: string;
	date: string;
};

export function getISODate(date: string | File | null, time: string | File | null) {
	return formatISO(new Date(`${date}T${time}:00`));
}

export function updateDate(formData: FormData) {
	const startTime = formData.get('startTime');
	const endTime = formData.get('endTime');
	const date = formData.get('date');
	formData.append('startDate', getISODate(date, startTime));
	formData.append('endDate', getISODate(date, endTime));
}

export function addEventIn(event: TEvent): TEvent & EventIn {
	return {
		...event,
		date: format(event.startDate, 'yyyy-MM-dd'),
		startTime: format(event.startDate, 'HH:mm'),
		endTime: format(event.endDate, 'HH:mm')
	};
}

export function getDateFromForm(date: Date | FormDataEntryValue | null | undefined): string {
	if (!date || !(date instanceof Date)) {
		return format(new Date(), 'yyyy-MM-dd');
	}

	return format(date, 'yyyy-MM-dd');
}

export function getTimeFrom(date: Date | FormDataEntryValue | null | undefined): string {
	if (!date || !(date instanceof Date)) {
		return format(new Date(), 'HH:mm');
	}

	return format(date, 'HH:mm');
}
