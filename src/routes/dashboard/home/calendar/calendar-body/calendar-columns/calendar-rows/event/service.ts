import type { EEvent } from '$lib/event/utils';
import { differenceInMinutes } from 'date-fns';

export function isShort(event: EEvent) {
	const diff = differenceInMinutes(event.startDate, event.endDate);
	return Math.abs(diff) <= 15;
}
