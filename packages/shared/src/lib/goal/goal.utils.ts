import type { Goal } from '$lib/goal/goal.model.js';

export function getGoalsForTasks(goals: Goal[]): Goal[] {
	const availableGoals = goals.filter((goal) => !goal.isDone);
	const smartGoals = availableGoals.filter((goal) => !!goal.deadline);
	return sortGoals(smartGoals);
}

export function sortGoals(goals: Goal[]) {
	return goals.toSorted((a, b) => {
		if (!a.deadline) return 1; // Place tasks with no deadline at the end
		if (!b.deadline) return -1;
		return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
	});
}
