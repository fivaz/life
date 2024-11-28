import { formatDate, getDateRoundDownTo15 } from '@life/shared/date';
import { addDays, startOfWeek } from 'date-fns';

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

const _weekDates = $derived<Date[]>(Array.from({ length: 7 }, (_, i) => addDays(_weekStart, i)));

export const weekDates = {
	get value() {
		return _weekDates;
	},
};
