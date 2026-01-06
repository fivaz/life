<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { getTotalDuration } from '@life/shared/task';

	import * as Tabs from '$lib/components/ui/tabs';

	import DayTaskItem from './day-task-item/DayTaskItem.svelte';

	interface Props {
		tasks: Task[];
		close: () => void;
		date: Date;
	}

	let { tasks, close, date }: Props = $props();

	let uncompletedTasks = $derived(tasks.filter((toDo) => !toDo.isDone));
	let uncompletedDuration = $derived(getTotalDuration(uncompletedTasks));
	let doneDuration = $derived(getTotalDuration(tasks.filter((toDo) => toDo.isDone)));

	let activeTab = $state('plan');

	$effect(() => {
		if (tasks.length === 0) {
			close();
		}
	});
</script>

<div
	class="relative flex h-auto max-h-[90%] w-11/12 max-w-135.75 flex-col divide-y divide-gray-400 rounded-lg border border-gray-400 bg-gray-50 text-sm leading-6 shadow-2xs dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:scheme-dark"
>
	<div class="flex-none p-6">
		<Tabs.Root class="w-full" bind:value={activeTab}>
			<Tabs.List class="grid w-full grid-cols-2 bg-gray-200/50 p-1 dark:bg-gray-800/50">
				<Tabs.Trigger
					class="rounded-md px-3 py-1.5 transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
					value="plan"
				>
					Plan
				</Tabs.Trigger>
				<Tabs.Trigger
					class="rounded-md px-3 py-1.5 transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
					value="currently"
				>
					Currently
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>

		<div class="mt-4 flex justify-between font-semibold">
			<LText><span class="text-green-500">{doneDuration}</span> done</LText>
			{#if uncompletedTasks.length}
				<LText><span class="text-red-500">{uncompletedDuration}</span> to complete</LText>
			{/if}
		</div>
	</div>

	<ul class="overflow-auto py-3">
		{#each tasks as task, index (task)}
			<DayTaskItem {date} {index} {task} />
		{/each}
	</ul>
</div>
