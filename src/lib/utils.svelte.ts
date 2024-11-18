import { format } from 'date-fns';

import { DATE, TIME } from '$lib/consts';
import type { HHmm, yyyyMMdd } from '$lib/task/task.model';

export const title = $state<{ value: string }>({ value: 'Dashboard' });

export function formatDate(date: Date): yyyyMMdd {
	return format(date, DATE) as yyyyMMdd;
}

export function formatTime(date: Date): HHmm {
	return format(date, TIME) as HHmm;
}
