import type { Goal } from '$lib/goal/goal.model';

export const goals = $state<{ value: Goal[] }>({ value: [] });
