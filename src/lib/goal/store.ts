import type { GGoal } from '$lib/goal/utils';
import { writable } from 'svelte/store';

export const goals = writable<GGoal[]>([]);

export function updateGoal(newGoal: GGoal) {
	goals.update(($goals) => {
		const index = $goals.findIndex((goal) => goal.id === newGoal.id);
		if (index !== -1) {
			return $goals.map((goal) => (goal.id === newGoal.id ? newGoal : goal));
		} else {
			return [...$goals, newGoal];
		}
	});
}

export function removeGoal(goal: GGoal) {
	goals.update(($goals) => $goals.filter((existingGoal) => existingGoal.id !== goal.id));
}
