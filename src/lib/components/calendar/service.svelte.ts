import { addDays, differenceInMilliseconds, endOfToday, startOfWeek } from 'date-fns';

// list of weekStarts in which the tasks have already been fetched
let _weekStart = $state<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

export const weekStart = {
	get value() {
		return _weekStart;
	},
	set value(newDate) {
		_weekStart = newDate;
	},
};

const _dates = $derived(Array.from({ length: 7 }, (_, i) => addDays(weekStart.value, i)));

export const dates = {
	get value() {
		return _dates;
	},
};

let _selectedDate = $state<Date>(new Date());

export const selectedDate = {
	get value() {
		return _selectedDate;
	},
	set value(newDate) {
		_selectedDate = newDate;
	},
};

export function updateDateAtMidnight() {
	console.warn('updateDateAtMidnight');
	const now = new Date();
	const timeUntilMidnight = differenceInMilliseconds(endOfToday(), now);

	setTimeout(() => {
		selectedDate.value = new Date();
		updateDateAtMidnight(); // Schedule the next update for the following midnight
	}, timeUntilMidnight);
}
