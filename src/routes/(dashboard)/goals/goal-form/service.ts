import type { Goal } from '$lib/goal/goal.model';

export function checkErrors(goal: Goal): string {
	if (!goal.name) {
		return 'name is required';
	}

	return '';
}
