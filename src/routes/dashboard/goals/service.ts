import { DATE } from '$lib/consts';
import type { GGoal } from '$lib/goal/utils';
import { format, lastDayOfQuarter } from 'date-fns';

export type GoalIn = Omit<GGoal, 'deadline'> & {
	deadline: string;
};

export function buildEmptyGoal(): GoalIn {
	return {
		id: 0,
		name: '',
		isDone: false,
		deadline: format(lastDayOfQuarter(new Date()), DATE),
	};
}
export function convertToGoalIn(goal: GGoal): GoalIn {
	return {
		...goal,
		deadline: format(goal.deadline, DATE),
	};
}
