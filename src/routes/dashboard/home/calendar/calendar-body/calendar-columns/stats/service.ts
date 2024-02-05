import type { types } from '$lib/category/utils';
import type { Event } from '$lib/task/utils';

import { getDuration } from '$lib/task/utils';

type GroupType = (typeof types)[number];

export function calculateGroupPercentages(events: Event[]): Record<GroupType, number> {
	const groupTimes = calculateGroupTimes(events);
	const totalDayTime = 24 * 60 * 60 * 1000; // Total day time in milliseconds
	const groupPercentage: Record<GroupType, number> = {
		fun: 0,
		sleep: 0,
		work: 0,
	};

	for (const group of Object.keys(groupTimes) as GroupType[]) {
		const percentage = (groupTimes[group] / totalDayTime) * 100;
		groupPercentage[group] = Number(percentage.toFixed(2));
	}

	return groupPercentage;
}

function calculateGroupTimes(events: Event[]): Record<GroupType, number> {
	const groupTimes: Record<GroupType, number> = {
		fun: 0,
		sleep: 0,
		work: 0,
	};

	for (const event of events) {
		const duration = getDuration(event);
		const currentTotal = groupTimes[event.category.type as GroupType];
		groupTimes[event.category.type as GroupType] = currentTotal + duration;
	}

	return groupTimes;
}
