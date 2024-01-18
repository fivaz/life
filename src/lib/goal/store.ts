import { DATE_FR } from '$lib/consts';
import type { GoalWithTasks } from '$lib/goal/utils';
import { format, isSameDay, lastDayOfQuarter } from 'date-fns';
import { derived, writable } from 'svelte/store';

export const goals = writable<GoalWithTasks[]>([]);

export function updateGoal(newGoal: GoalWithTasks) {
	goals.update(($goals) => {
		const index = $goals.findIndex((goal) => goal.id === newGoal.id);
		if (index !== -1) {
			return $goals.map((goal) => (goal.id === newGoal.id ? newGoal : goal));
		} else {
			return [...$goals, newGoal];
		}
	});
}

export function removeGoal(goal: GoalWithTasks) {
	goals.update(($goals) => $goals.filter((existingGoal) => existingGoal.id !== goal.id));
}

function getDateName(date: Date): string {
	if (isSameDay(date, lastDayOfQuarter(new Date()))) {
		return 'This quarter';
	}
	return format(date, DATE_FR);
}

function groupGoalsByDate(goals: GoalWithTasks[]): Record<string, GoalWithTasks[]> {
	return goals.reduce<Record<string, GoalWithTasks[]>>((groups, goal) => {
		const date = getDateName(goal.deadline);

		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(goal);
		return groups;
	}, {});
}

export const groupedGoals = derived(goals, ($tasks) => groupGoalsByDate($tasks));
