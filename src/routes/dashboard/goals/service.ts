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

function sortGoals(goals: Goal[]) {
	return goals.sort((a, b) => {
		const dateA = a.deadline ? parse(a.deadline, DATE, new Date()) : null;
		const dateB = b.deadline ? parse(b.deadline, DATE, new Date()) : null;
		if (!dateA) {
			return 1;
		}
		if (!dateB) {
			return -1;
		}
		return dateA.getTime() - dateB.getTime();
	});
}

function getDateName(goal: Goal): string {
	if (!goal.deadline) {
		return 'Someday';
	}

	const date = parse(goal.deadline, DATE, new Date());

	if (isSameDay(date, lastDayOfQuarter(new Date()))) {
		return 'This quarter';
	}

	return format(date, DATE_FR);
}
function groupGoalsByDate(goals: Goal[]): Record<string, Goal[]> {
	return goals.reduce<Record<string, Goal[]>>((groups, goal) => {
		const date = getDateName(goal);

		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(goal);
		return groups;
	}, {});
}

function getGoalsByOrderedDate(goalsByDate: Record<string, Goal[]>) {
	const priorityObject: Record<string, number> = {
		'Last quarter': 6,
		Overdue: 1,
		'Second quarter': 3,
		Someday: 7,
		'Third quarter': 4,
		// Rest : 5
		'This quarter': 2,
	};

	function sorting(a: string, b: string) {
		const priorityA = priorityObject[a] || 4;
		const priorityB = priorityObject[b] || 4;

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
	const sortedTasks = sortGoals(goals);
	const tasksByDate = groupGoalsByDate(sortedTasks);
	return getGoalsByOrderedDate(tasksByDate);
}
