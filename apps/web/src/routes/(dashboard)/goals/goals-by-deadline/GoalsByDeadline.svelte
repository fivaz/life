<script lang="ts">
	import { LText } from '@life/shared';
	import { ChevronDownIcon, ChevronUpIcon } from 'lucide-svelte';

	import { useGoals } from '$lib/goal/goal.svelte';

	import GoalRow from '../goal-row/GoalRow.svelte';
	import { sortGoalsByDate } from '../service';

	let goals = useGoals();

	let unCompletedGoals = $derived(goals.value.filter((goal) => !goal.isDone));

	let completedGoals = $derived(goals.value.filter((goal) => goal.isDone));

	let goalsByDate = $derived(sortGoalsByDate(unCompletedGoals));

	let isCompleteListOpen = $state(false);
</script>

<div class="flex flex-col gap-5">
	<div class="flex flex-col gap-2">
		{#each goalsByDate as date (date)}
			<LText class="font-semibold">{date}</LText>
			<div class="flex flex-col gap-3">
				{#each goalsByDate[date] as goal (goal.id)}
					<GoalRow goal={{ ...goal, children: [] }} />
				{/each}
			</div>
		{/each}

		{#if isCompleteListOpen}
			<LText class="p-2 font-semibold">Completed goals</LText>
			<div class="flex flex-col gap-3">
				{#each completedGoals as goal (goal.id)}
					<GoalRow goal={{ ...goal, children: [] }} />
				{/each}
			</div>
		{/if}
	</div>

	<button
		class="flex w-full items-end justify-center gap-2 rounded-md border border-dashed border-gray-400 text-base hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
		onclick={() => (isCompleteListOpen = !isCompleteListOpen)}
	>
		<LText>completed goals</LText>
		<LText>
			{#if isCompleteListOpen}
				<ChevronUpIcon class="size-4 animate-bounce" />
			{:else}
				<ChevronDownIcon class="size-4 animate-bounce" />
			{/if}
		</LText>
	</button>
</div>
