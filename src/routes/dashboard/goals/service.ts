import type { Goal } from '$lib/goal/utils';

import { DATE, DATE_FR } from '$lib/consts';
import { format, isSameDay, lastDayOfQuarter, parse } from 'date-fns';

export function buildEmptyGoal(): Goal {
	return {
		deadline: format(lastDayOfQuarter(new Date()), DATE),
		id: '',
		isDone: false,
		name: '',
	};
}

function getDateName(dateString: string): string {
	const date = parse(dateString, DATE, new Date());
	if (isSameDay(date, lastDayOfQuarter(new Date()))) {
		return 'This quarter';
	}
	return format(date, DATE_FR);
}

export function groupGoalsByDate(goals: Goal[]): Record<string, Goal[]> {
	return goals.reduce<Record<string, Goal[]>>((groups, goal) => {
		const date = getDateName(goal.deadline);
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(goal);
		return groups;
	}, {});
}
