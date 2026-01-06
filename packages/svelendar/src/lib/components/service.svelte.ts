import { formatDate, getDateRoundDownTo15 } from '@life/shared/date';
import { addDays, set, startOfWeek } from 'date-fns';
import { SvelteDate } from 'svelte/reactivity';

export const currentDate = $state<{ value: Date }>({ value: getDateRoundDownTo15() });

export function updateCurrentDate() {
	const now = new SvelteDate();
	now.setMilliseconds(0);
	currentDate.value = now;

	// Update only time in selectedDate, this is important for the Calendar Add Event, to always give the current time for the event, but the selected date
	selectedDate.value = set(selectedDate.value, {
		hours: now.getHours(),
		minutes: now.getMinutes(),
		seconds: now.getSeconds(),
	});
}

let _selectedDate = $state<Date>(new Date());

// this is used in WeekListSelector to know the right direction for the slide animation
export const previousDate = $state<{ value: Date }>({ value: new SvelteDate() });

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

const _weekDates = $derived<Date[]>(Array.from({ length: 7 }, (_, i) => addDays(_weekStart, i)));

export const weekDates = {
	get value() {
		return _weekDates;
	},
};
