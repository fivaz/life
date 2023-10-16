import { DATE, TIME } from '$lib';
import { addMinutes, format, formatISO, parse } from 'date-fns';
import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/$types';

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

export function getFields(form: ActionData): Omit<EventIn, 'endTime'> {
	if (form?.save) {
		return {
			id: form.data.id,
			name: form.data.name,
			description: form.data.description,
			isDone: form.data.isDone,
			date: format(form.data.startDate, DATE),
			startTime: format(form.data.startDate, TIME)
		};
	} else {
		return {
			id: 0,
			name: '',
			description: null,
			isDone: false,
			date: format(new Date(), DATE),
			startTime: format(new Date(), TIME)
		};
	}
}

export function add15Minutes(time: string) {
	const date = parse(time, TIME, new Date());

	const date15MinutesLater = addMinutes(date, 15);

	return format(date15MinutesLater, TIME);
}
