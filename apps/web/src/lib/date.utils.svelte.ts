import { format, parse } from 'date-fns';

export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export const DATE_FR = 'dd.MM.yyyy';
export const DATE_FR_SHORT = 'dd.MM';
export const DATETIME = 'yyyy-MM-dd HH:mm';

export const title = $state<{ value: string }>({ value: 'Dashboard' });

export function formatDate(date: Date): string {
	return format(date, DATE);
}

export function parseDate(date: string): Date {
	return parse(date, DATE, new Date());
}

export function formatTime(date: Date): string {
	return format(date, TIME);
}

export type dateISO = string;
