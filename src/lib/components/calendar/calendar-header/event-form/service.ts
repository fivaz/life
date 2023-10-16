import { addMinutes, format, formatISO } from 'date-fns';
import type { ActionData } from '../../../../../../.svelte-kit/types/src/routes/$types';

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

export function getFields(form: ActionData): EventIn {
	if (form?.save) {
		return {
			id: form.data.id,
			name: form.data.name,
			description: form.data.description,
			isDone: form.data.isDone,
			date: format(form.data.startDate, 'yyyy-MM-dd'),
			startTime: format(form.data.startDate, 'HH:mm'),
			endTime: format(form.data.endDate, 'HH:mm')
		};
	} else {
		return {
			id: 0,
			name: '',
			description: null,
			isDone: false,
			date: format(new Date(), 'yyyy-MM-dd'),
			startTime: format(new Date(), 'HH:mm'),
			endTime: format(addMinutes(new Date(), 15), 'HH:mm')
		};
	}
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
