import type { TEvent } from '$lib';
import { differenceInMinutes } from 'date-fns';

export function isShort(event: TEvent) {
	const diff = differenceInMinutes(event.startDate, event.endDate);
	return Math.abs(diff) <= 15;
}
