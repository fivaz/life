<script lang="ts">
	import { LText } from '@life/shared';
	import type { Goal } from '@life/shared/goal';
	import { ChevronDown, ChevronUp } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDownIcon, ChevronUpIcon } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import { useGoals } from '$lib/goal/goal.svelte';

	import GoalRow from '../goal-row/GoalRow.svelte';
	import type { HierarchicalGoal } from './service';
	import { buildGoalHierarchy } from './service';

	interface Props {
		categories: Category[];
	}

	let { categories }: Props = $props();

	const goals = useGoals<HierarchicalGoal>(buildGoalHierarchy);

	let unCompletedGoals = $derived(goals.value.filter((goal) => !goal.isDone));

	let completedGoals = $derived(goals.value.filter((goal) => goal.isDone));

	let isCompleteListOpen = $state(false);
</script>

<div class="flex flex-col gap-3">
	{#each unCompletedGoals as goal (goal.id)}
		<GoalRow {categories} {goal} isHierarchicalView={true} />
	{/each}

	{#if isCompleteListOpen}
		<LText class="p-2 font-semibold">Completed goals</LText>
		{#each completedGoals as goal (goal.id)}
			<GoalRow {categories} {goal} isHierarchicalView={true} />
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
