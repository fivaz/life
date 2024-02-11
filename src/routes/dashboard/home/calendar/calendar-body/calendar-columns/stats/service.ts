import type { GroupType } from '$lib/category/utils';
import type { AnyEvent } from '$lib/task/utils';

import { getDurationInMinutes } from '$lib/task/utils';

function calculateRestOfDay(groupTime: Record<GroupType, number>): number {
	const nonFunPercentage = groupTime.work + groupTime.sleep;
	return 100 - nonFunPercentage;
}
export function calculateGroupPercentages(events: AnyEvent[]): Record<GroupType, number> {
	const groupTime = calculateGroupTime(events);
	const totalDayTime = 24 * 60; // a day in minutes
	const groupPercentage: Record<GroupType, number> = {
		fun: 0,
		sleep: 0,
		work: 0,
	};

	for (const group of Object.keys(groupTime) as GroupType[]) {
		const percentage = (groupTime[group] / totalDayTime) * 100;
		groupPercentage[group] = Math.round(percentage);
	}

	groupPercentage.fun = calculateRestOfDay(groupPercentage);

	return groupPercentage;
}

function calculateGroupTime(events: AnyEvent[]): Record<GroupType, number> {
	const groupTimes: Record<GroupType, number> = {
		fun: 0,
		sleep: 0,
		work: 0,
	};

	for (const event of events) {
		const duration = getDurationInMinutes(event);
		const currentTotal = groupTimes[event.category.type];
		groupTimes[event.category.type] = currentTotal + duration;
	}

	return groupTimes;
}
