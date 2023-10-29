import { groups } from '$lib/category/utils';
import type { EEvent } from '$lib/event/utils';
import { DATE, TIME } from '$lib/utils';
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

export function getDate(form: ActionData): string {
	if (form?.saved) {
		return format(form.saved.startDate, DATE);
	} else {
		return format(new Date(), DATE);
	}
}

export function getStartDate(form: ActionData): string {
	if (form?.saved) {
		return format(form.saved.startDate, TIME);
	} else {
		return format(new Date(), TIME);
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

export function buildEvent(date: Date, timeInterval: number): EEvent {
	return {
		id: 0,
		name: '',
		description: null,
		startDate: buildDate(date, timeInterval),
		endDate: buildDate(date, timeInterval + 0.5),
		isDone: false,
		categoryId: 0,
		category: {
			id: 0,
			name: '',
			isDefault: false,
			color: '',
			group: groups[0],
		},
	};
}

function buildDate(date: Date, timeInterval: number) {
	if (timeInterval < 0 || timeInterval > 48) {
		throw 'Invalid number. Please enter a number between 0 and 48.';
	}

	return setMinutes(setHours(date, 0), timeInterval * 30);
}
