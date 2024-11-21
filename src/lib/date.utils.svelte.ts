import { addDays, format, parse, startOfWeek } from 'date-fns';

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

export function parseDate(date: yyyyMMdd): Date {
	return parse(date, DATE, new Date());
}

export function formatTime(date: Date): HHmm {
	return format(date, TIME) as HHmm;
}

export type yyyyMMdd = `${number}-${number}-${number}`;
export type HHmm = `${number}:${number}`;
export type dateISO = string;

export const currentDate = $state<{ value: Date }>({ value: getDateRoundDownTo15() });

let _selectedDate = $state<Date>(new Date());

// this is used in WeekListSelector to know the right direction for the slide animation
export const previousDate = $state<{ value: Date }>({ value: new Date() });

export const selectedDate = {
	get value() {
		return _selectedDate;
	},
	set value(newDate: Date) {
		previousDate.value = _selectedDate;
		_selectedDate = newDate;
	},
};

let _weekStart = $state<Date>(startOfWeek(currentDate.value, { weekStartsOn }));

export const previousWeekStart = $state<{ value: Date }>({ value: _weekStart });

export const weekStart = {
	get value() {
		return _weekStart;
	},
	set value(newWeekStart) {
		previousWeekStart.value = _weekStart;
		_weekStart = newWeekStart;
	},
};

const _weekDates = $derived<Date[]>(Array.from({ length: 7 }, (_, i) => addDays(_weekStart, i)));

export const weekDates = {
	get value() {
		return _weekDates;
	},
};
