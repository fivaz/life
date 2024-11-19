import { addDays, differenceInMilliseconds, startOfWeek } from 'date-fns';

import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
import { weekStartsOn } from '$lib/date.utils.svelte';
import { getDateRoundDownTo15 } from '$lib/task/time-utils';

// list of weekStarts in which the tasks have already been fetched
export const weekStart = $state<{ value: Date }>({
	value: startOfWeek(new Date(), { weekStartsOn }),
});

const _weekDays = $derived(Array.from({ length: 7 }, (_, i) => addDays(weekStart.value, i)));

export const weekDays = {
	get value() {
		return _weekDays;
	},
};

export const currentDate = $state<{ value: Date }>({ value: getDateRoundDownTo15() });

export const selectedDate = $state<{ value: Date }>({ value: new Date() });

export function getNextRoundedTime() {
	const now = new Date();

	const currentTimeMilliseconds = now.getTime();

	const roundedMilliseconds = 1000 * 60 * GRID_CELL_TIME;
	const nextTimeRounded =
		Math.ceil(currentTimeMilliseconds / roundedMilliseconds) * roundedMilliseconds;

	return differenceInMilliseconds(nextTimeRounded, currentTimeMilliseconds);
}
