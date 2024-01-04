import type { TTask } from '$lib/task/utils';
import { differenceInMinutes } from 'date-fns';

export function isShort(event: TTask) {
	const diff = differenceInMinutes(event.startDate, event.endDate);
	return Math.abs(diff) <= 15;
}
