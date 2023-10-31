import type { EEvent } from '$lib/event/utils';
import { DATE, TIME } from '$lib/utils';
import { addMinutes, format, parse } from 'date-fns';

export function getDate(event: EEvent): string {
	return format(event.startDate, DATE);
}

export function getStartTime(event: EEvent): string {
	return format(event.startDate, TIME);
}

export function getEndTime(event: EEvent): string {
	return format(event.endDate, TIME);
}

export function add15Minutes(time: string) {
	try {
		const date = parse(time, TIME, new Date());

		return addMinutes(date, 15);
	} catch (e) {
		return null;
	}
}
