import type { Goal } from '$lib/goal/goal.model';
import { fetchGoals } from '$lib/goal/goal.repository';

const goals = $state<Goal[]>([]);

let hasStarted = $state<boolean>(false);

export function useGoals<T = Goal>(handleGoals?: (goals: Goal[]) => T[]) {
	if (goals.length === 0 && !hasStarted) {
		hasStarted = true;
		fetchGoals(goals);
	}

	return {
		get value(): T[] {
			if (handleGoals) {
				return handleGoals(goals);
			} else {
				return goals as T[];
			}
		},
	};
}
