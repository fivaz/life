import { format } from 'date-fns';
import { z } from 'zod';

import { getDateRoundDownTo15 } from '$lib/task/time-utils';

export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export const DATE_FR = 'dd.MM.yyyy';
export const DATE_FR_SHORT = 'dd.MM';
export const DATETIME = 'yyyy-MM-dd HH:mm';

// when the week starts in the app, 1 is for Monday
export const weekStartsOn = 1;

export const title = $state<{ value: string }>({ value: 'Dashboard' });

export function formatDate(date: Date): yyyyMMdd {
	return format(date, DATE) as yyyyMMdd;
}

export function formatTime(date: Date): HHmm {
	return format(date, TIME) as HHmm;
}

export type yyyyMMdd = `${number}-${number}-${number}`;
export type HHmm = `${number}:${number}`;
export type dateISO = string;

export const zDate = z.custom<yyyyMMdd>((val) => {
	return typeof val === 'string' ? /^\d{4}-\d{2}-\d{2}$/.test(val) : false;
});

export const zTime = z.custom<HHmm>((val) => {
	return typeof val === 'string' ? /^\d{2}:\d{2}$/.test(val) : false;
});

export const currentDate = $state<{ value: Date }>({ value: getDateRoundDownTo15() });

export const selectedDate = $state<{ value: Date }>({ value: new Date() });
