<script lang="ts">
	import type { Goal } from '@life/shared/goal';
	import type { Task } from '@life/shared/task';
	import { ChevronDown, ChevronUp } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import GoalRow from '../goal-row/GoalRow.svelte';
	import { sortGoalsByDate } from '../service';

	interface Props {
		goals: Goal[];
		addTask: (goal: Goal) => void;
		editTask: (task: Task) => void;
		editGoal: (goal: Goal) => void;
	}

	let { goals, addTask, editGoal, editTask }: Props = $props();

	let unCompletedGoals = $derived(goals.filter((goal) => !goal.isDone));

	let completedGoals = $derived(goals.filter((goal) => goal.isDone));

	let goalsByDate = $derived(sortGoalsByDate(unCompletedGoals));

	let isCompleteListOpen = $state(false);
</script>

<div class="flex flex-col gap-5">
	<div class="divide-y divide-gray-100">
		{#each goalsByDate as date (date)}
			<div class="flex justify-between p-2 font-semibold">{date}</div>
			<div class="flex flex-col gap-3">
				{#each goalsByDate[date] as goal (goal.id)}
					<GoalRow
						addTask={() => addTask(goal)}
						{editGoal}
						{editTask}
						goal={{ ...goal, children: [] }}
					/>
				{/each}
			</div>
		{/each}

		{#if isCompleteListOpen}
			<div class="flex justify-between p-2 font-semibold">Completed goals</div>
			<div class="flex flex-col gap-3">
				{#each completedGoals as goal (goal.id)}
					<GoalRow {addTask} {editGoal} {editTask} goal={{ ...goal, children: [] }} />
				{/each}
			</div>
		{/if}
	</div>

	<button
		class="flex w-full items-end justify-center gap-2 text-base hover:bg-gray-100 hover:underline"
		onclick={() => (isCompleteListOpen = !isCompleteListOpen)}
	>
		completed goals
		<Icon class="h-4 w-4 animate-bounce" src={isCompleteListOpen ? ChevronUp : ChevronDown} />
	</button>
</div>
