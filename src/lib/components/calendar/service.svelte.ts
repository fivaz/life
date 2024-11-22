import { addDays, differenceInMilliseconds, startOfWeek } from 'date-fns';

import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
import { selectedDate } from '$lib/date.utils.svelte';

export function getNextRoundedTime() {
	const now = new Date();

	const currentTimeMilliseconds = now.getTime();

	const roundedMilliseconds = 1000 * 60 * GRID_CELL_TIME;
	const nextTimeRounded =
		Math.ceil(currentTimeMilliseconds / roundedMilliseconds) * roundedMilliseconds;

	return differenceInMilliseconds(nextTimeRounded, currentTimeMilliseconds);
}

const _weekDates = $derived.by<Date[]>(() => {
	const weekStart = startOfWeek(selectedDate.value);
	return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
});

export const weekDates = {
	get value() {
		return _weekDates;
	},
};
