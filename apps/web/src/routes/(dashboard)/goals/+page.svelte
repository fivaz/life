<script lang="ts">
	import { Button, LText } from '@life/shared';
	import { CalendarArrowDown, ListTree } from 'lucide-svelte';

	import type { Goal } from '$lib/goal/goal.model';
	import { buildEmptyGoal } from '$lib/goal/goal.model';
	import { title } from '$lib/utils.svelte';

	import GoalFormButton from './goal-form/GoalFormButton.svelte';
	import GoalsByDeadline from './goals-by-deadline/GoalsByDeadline.svelte';
	import GoalsByParent from './goals-by-parent/GoalsByParent.svelte';

	let newGoal = $state<Goal>(buildEmptyGoal());

	title.value = 'Goals';

	let isSmartView = $state(true);
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<LText class="hidden text-2xl font-bold md:block">{title.value}</LText>

		<div class="flex items-center justify-between gap-5 md:grow-0">
			<Button color="white" onclick={() => (isSmartView = !isSmartView)} padding="p-1.5">
				{#if isSmartView}
					<ListTree class="size-5" />
				{:else}
					<CalendarArrowDown class="size-5" />
				{/if}
			</Button>

			<div class=" h-7 border-r border-gray-300 dark:border-gray-700"></div>

			<GoalFormButton goal={newGoal} />
		</div>
	</div>

	{#if isSmartView}
		<GoalsByDeadline />
	{:else}
		<GoalsByParent />
	{/if}
</div>
