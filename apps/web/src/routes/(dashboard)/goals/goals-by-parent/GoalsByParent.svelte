<script lang="ts">
	import { LText } from '@life/shared';
	import type { Goal } from '@life/shared/goal';
	import { ChevronDown, ChevronUp } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDownIcon, ChevronUpIcon } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';

	import GoalRow from '../goal-row/GoalRow.svelte';
	import { buildGoalHierarchy } from './service';

	interface Props {
		goals: Goal[];
		categories: Category[];
	}

	let { goals, categories }: Props = $props();

	let goalsHierarchy = $derived(buildGoalHierarchy(goals));

	let unCompletedGoals = $derived(goalsHierarchy.filter((goal) => !goal.isDone));

	let completedGoals = $derived(goalsHierarchy.filter((goal) => goal.isDone));

	let isCompleteListOpen = $state(false);
</script>

<div class="flex flex-col gap-3">
	{#each unCompletedGoals as goal (goal.id)}
		<GoalRow {categories} {goal} {goals} isHierarchicalView={true} />
	{/each}

	{#if isCompleteListOpen}
		<LText class="p-2 font-semibold">Completed goals</LText>
		{#each completedGoals as goal (goal.id)}
			<GoalRow {categories} {goal} {goals} isHierarchicalView={true} />
		{/each}
	{/if}
</div>

<button
	class="flex w-full items-end justify-center gap-2 divide-gray-400 rounded-md border border-dashed border-gray-400 text-base hover:bg-gray-100 dark:divide-gray-700 dark:border-gray-700 dark:hover:bg-gray-900"
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
