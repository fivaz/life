import type { EEvent } from '$lib';
import { DATE, TIME } from '$lib';
import { addMinutes, format, formatISO, parse, setHours, setMinutes } from 'date-fns';
import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/$types';

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
	if (form?.saved) {
		return {
			id: form.saved.id,
			name: form.saved.name,
			description: form.saved.description,
			isDone: form.saved.isDone,
			date: format(form.saved.startDate, DATE),
			startTime: format(form.saved.startDate, TIME),
			endTime: format(form.saved.endDate, TIME)
		};
	} else {
		return {
			id: 0,
			name: '',
			description: null,
			isDone: false,
			date: format(new Date(), DATE),
			startTime: format(new Date(), TIME),
			endTime: format(addMinutes(new Date(), 15), TIME)
		};
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
	const date = parse(time, TIME, new Date());

	const date15MinutesLater = addMinutes(date, 15);

	return format(date15MinutesLater, TIME);
}

export function buildEvent(date: Date, timeInterval: number): EEvent {
	return {
		id: 0,
		name: '',
		description: null,
		startDate: buildDate(date, timeInterval),
		endDate: buildDate(date, timeInterval + 0.5),
		isDone: false
	};
}

function buildDate(date: Date, timeInterval: number) {
	if (timeInterval < 0 || timeInterval > 48) {
		throw 'Invalid number. Please enter a number between 0 and 48.';
	}

	return setMinutes(setHours(date, 0), timeInterval * 30);
}
