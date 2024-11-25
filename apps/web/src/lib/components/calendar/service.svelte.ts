import { addDays, differenceInMilliseconds, startOfWeek } from 'date-fns';

import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
import { formatDate } from '$lib/date.utils.svelte';
import { getDateRoundDownTo15 } from '$lib/task/time-utils';

export function getNextRoundedTime() {
	const now = new Date();

	const currentTimeMilliseconds = now.getTime();

	const roundedMilliseconds = 1000 * 60 * GRID_CELL_TIME;
	const nextTimeRounded =
		Math.ceil(currentTimeMilliseconds / roundedMilliseconds) * roundedMilliseconds;

	return differenceInMilliseconds(nextTimeRounded, currentTimeMilliseconds);
}

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

// weekStart needs to be a string because an object isn't the same as another object,
// and it has animations tied to when the value changes
const _weekStart = $derived<string>(formatDate(startOfWeek(selectedDate.value)));

export const weekStart = {
	get value() {
		return _weekStart;
	},
};

const _weekDates = $derived<Date[]>(Array.from({ length: 7 }, (_, i) => addDays(_weekStart, i)));

export const weekDates = {
	get value() {
		return _weekDates;
	},
};
