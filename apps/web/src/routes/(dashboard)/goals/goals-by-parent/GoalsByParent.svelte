<script lang="ts">
	import type { Goal } from '@life/shared/goal';
	import type { Task } from '@life/shared/task';
	import { ChevronDown, ChevronUp } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import GoalRow from '../goal-row/GoalRow.svelte';
	import { buildGoalHierarchy } from './service';

	interface Props {
		goals: Goal[];
		addGoal: (goal: Goal) => void;
		addTask: (goal: Goal) => void;
		editTask: (task: Task) => void;
		editGoal: (goal: Goal) => void;
	}

	let { goals, addGoal, addTask, editGoal, editTask }: Props = $props();

	let goalsHierarchy = $derived(buildGoalHierarchy(goals));

	let unCompletedGoals = $derived(goalsHierarchy.filter((goal) => !goal.isDone));

	let completedGoals = $derived(goalsHierarchy.filter((goal) => goal.isDone));

	let isCompleteListOpen = $state(false);
</script>

<div class="flex flex-col gap-3">
	{#each unCompletedGoals as goal (goal.id)}
		<GoalRow {addGoal} {addTask} {editGoal} {editTask} {goal} {goals} />
	{/each}

	{#if isCompleteListOpen}
		<div class="flex justify-between p-2 font-semibold">Completed goals</div>
		{#each completedGoals as goal (goal.id)}
			<GoalRow {addGoal} {addTask} {editGoal} {editTask} {goal} {goals} />
		{/each}
	{/if}
</div>

<button
	class="flex w-full items-end justify-center gap-2 text-base hover:bg-gray-100 hover:underline"
	onclick={() => (isCompleteListOpen = !isCompleteListOpen)}
>
	completed goals
	<Icon class="h-4 w-4 animate-bounce" src={isCompleteListOpen ? ChevronUp : ChevronDown} />
</button>
