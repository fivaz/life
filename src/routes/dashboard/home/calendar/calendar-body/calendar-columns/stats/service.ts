import type { groups } from '$lib/category/utils';
import type { EEvent } from '$lib/event/utils';
import { differenceInMilliseconds } from 'date-fns';

type GroupType = (typeof groups)[number];

export function calculateGroupPercentages(events: EEvent[]): Record<GroupType, number> {
	const groupTimes = calculateGroupTimes(events);
	const totalDayTime = 24 * 60 * 60 * 1000; // Total day time in milliseconds
	const groupPercentage: Record<GroupType, number> = {
		sleep: 0,
		work: 0,
		fun: 0,
	};

	for (const group of Object.keys(groupTimes) as GroupType[]) {
		const percentage = (groupTimes[group] / totalDayTime) * 100;
		groupPercentage[group] = Number(percentage.toFixed(2));
	}

	return groupPercentage;
}

function calculateGroupTimes(events: EEvent[]): Record<GroupType, number> {
	const groupTimes: Record<GroupType, number> = {
		sleep: 0,
		work: 0,
		fun: 0,
	};

	for (const event of events) {
		const duration = differenceInMilliseconds(event.endDate, event.startDate);
		const currentTotal = groupTimes[event.category.group as GroupType];
		groupTimes[event.category.group as GroupType] = currentTotal + duration;
	}

	return groupTimes;
}
