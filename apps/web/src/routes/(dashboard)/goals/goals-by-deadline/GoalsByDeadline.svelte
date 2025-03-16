<script lang="ts">
	import { LText } from '@life/shared';
	import type { Goal } from '@life/shared/goal';
	import type { Task } from '@life/shared/task';
	import { ChevronDownIcon, ChevronUpIcon } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';

	import GoalRow from '../goal-row/GoalRow.svelte';
	import { sortGoalsByDate } from '../service';

	interface Props {
		goals: Goal[];
		categories: Category[];
	}

	let { goals, categories }: Props = $props();

	let unCompletedGoals = $derived(goals.filter((goal) => !goal.isDone));

	let completedGoals = $derived(goals.filter((goal) => goal.isDone));

	let goalsByDate = $derived(sortGoalsByDate(unCompletedGoals));

	let isCompleteListOpen = $state(false);
</script>

<div class="flex flex-col gap-5">
	<div class="flex flex-col gap-2">
		{#each goalsByDate as date (date)}
			<LText class="font-semibold">{date}</LText>
			<div class="flex flex-col gap-3">
				{#each goalsByDate[date] as goal (goal.id)}
					<GoalRow {categories} goal={{ ...goal, children: [] }} {goals} />
				{/each}
			</div>
		{/each}

		{#if isCompleteListOpen}
			<LText class="font-semibold">Completed goals</LText>
			<div class="flex flex-col gap-3">
				{#each completedGoals as goal (goal.id)}
					<GoalRow {categories} goal={{ ...goal, children: [] }} {goals} />
				{/each}
			</div>
		{/if}
	</div>

	<button
		class="flex w-full items-end justify-center gap-2 rounded-md text-base outline-dashed outline-1 outline-gray-300 hover:bg-gray-100 hover:underline dark:outline-gray-700 hover:dark:bg-gray-900"
		onclick={() => (isCompleteListOpen = !isCompleteListOpen)}
	>
		<LText>completed goals</LText>
		<LText>
			{#if isCompleteListOpen}
				<ChevronUpIcon class="size-4 animate-bounce"></ChevronUpIcon>
			{:else}
				<ChevronDownIcon class="size-4 animate-bounce"></ChevronDownIcon>
			{/if}
		</LText>
	</button>
</div>
