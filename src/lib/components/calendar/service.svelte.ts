import { addDays, differenceInMilliseconds, endOfToday, startOfWeek } from 'date-fns';

// list of weekStarts in which the tasks have already been fetched
export const weekStart = $state<{ value: Date }>({
	value: startOfWeek(new Date(), { weekStartsOn: 1 }),
});

const _weekDays = $derived(Array.from({ length: 7 }, (_, i) => addDays(weekStart.value, i)));

export const weekDays = {
	get value() {
		return _weekDays;
	},
};

export const selectedDate = $state<{ value: Date }>({ value: new Date() });

export function updateDateAtMidnight() {
	console.warn('updateDateAtMidnight');
	const now = new Date();
	const timeUntilMidnight = differenceInMilliseconds(endOfToday(), now);

	setTimeout(() => {
		selectedDate.value = new Date();
		updateDateAtMidnight(); // Schedule the next update for the following midnight
	}, timeUntilMidnight);
}
