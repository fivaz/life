import type { Event } from '$lib/task/utils';
import { getDuration } from '$lib/task/utils';

export function isShort(event: Event) {
	return Math.abs(getDuration(event)) <= 15;
}
