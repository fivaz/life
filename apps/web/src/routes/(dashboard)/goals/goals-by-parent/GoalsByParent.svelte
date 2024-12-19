<script lang="ts">
	import type { Goal } from '@life/shared/goal';
	import type { Task } from '@life/shared/task';

	import GoalRow from '../goal-row/GoalRow.svelte';
	import { buildGoalHierarchy } from './service';

	interface Props {
		goals: Goal[];
		addTask: (goal: Goal) => void;
		editTask: (task: Task) => void;
		editGoal: (goal: Goal) => void;
	}

	let { goals, addTask, editGoal, editTask }: Props = $props();

	let goalsHierarchy = $derived(buildGoalHierarchy(goals));

	$inspect(goalsHierarchy);
</script>

<div class="flex flex-col gap-5">
	{#each goalsHierarchy as goal (goal.id)}
		<GoalRow {addTask} {editGoal} {editTask} {goal} />
	{/each}
</div>
