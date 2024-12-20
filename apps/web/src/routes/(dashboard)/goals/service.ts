import { parseDate } from '@life/shared/date';
import { format, getQuarter, isPast, isThisYear } from 'date-fns';

import type { Goal } from '$lib/goal/goal.model';
import { groupBy } from '$lib/utils';
import { DATE_FR } from '$lib/utils.svelte';

enum GROUPS {
	Done = 'Done',
	Overdue = 'Overdue',
	Q1 = 'First quarter',
	Q2 = 'Second quarter',
	Q3 = 'Third quarter',
	Q4 = 'Forth quarter',
	Someday = 'Someday',
}

function getDateName(goal: Goal): GROUPS | string {
	if (goal.isDone) {
		return GROUPS.Done;
	}

	if (!goal.deadline) {
		return GROUPS.Someday;
	}

	const date = parseDate(goal.deadline);

	if (isPast(date)) {
		return GROUPS.Overdue;
	}

	const quarter = getQuarter(date);
	const thisYear = isThisYear(date);

	if (quarter === 1 && thisYear) {
		return GROUPS.Q1;
	}

	if (quarter === 2 && thisYear) {
		return GROUPS.Q2;
	}

	if (quarter === 3 && thisYear) {
		return GROUPS.Q3;
	}

	if (quarter === 4 && thisYear) {
		return GROUPS.Q4;
	}

	return format(date, DATE_FR);
}

function getGoalsByOrderedDate(goalsByDate: Record<string, Goal[]>) {
	const priorityObject: Record<string, number> = {
		[GROUPS.Done]: 8,
		[GROUPS.Overdue]: 1,
		[GROUPS.Q1]: 2,
		[GROUPS.Q2]: 3,
		[GROUPS.Q3]: 4,
		[GROUPS.Q4]: 5,
		// Rest: 6
		[GROUPS.Someday]: 7,
	};

	function sorting(a: string, b: string) {
		// 6 is the Number representing the rest
		const priorityA = priorityObject[a] || 6;
		const priorityB = priorityObject[b] || 6;

		return priorityA - priorityB;
	}

	return {
		[Symbol.iterator]: function* () {
			const sortedKeys = Object.keys(this).sort(sorting);
			for (const key of sortedKeys) {
				yield key;
			}
		},
		...goalsByDate,
	};
}

export function sortGoalsByDate(goals: Goal[]): Record<string, Goal[]> & Iterable<string> {
	const goalsByDate = groupBy(goals, getDateName);
	return getGoalsByOrderedDate(goalsByDate);
}
