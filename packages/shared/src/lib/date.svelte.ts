import { addMinutes } from 'date-fns';

import { getCurrentRoundedDate } from '$lib/date.js';

export const currentDate = $state<{ value: Date; interval: NodeJS.Timeout | null }>({
	value: getCurrentRoundedDate(),
	interval: null,
});

export function startCurrentDateUpdater() {
	if (currentDate.interval) {
		return;
	}

	currentDate.interval = setInterval(
		() => {
			currentDate.value = addMinutes(currentDate.value, 15);
		},
		15 * 60 * 1000,
	);
}

export function stopCurrentDateUpdater() {
	if (!currentDate.interval) {
		return;
	}

	clearInterval(currentDate.interval);
	currentDate.interval = null;
}
