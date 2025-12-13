<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { getTotalDuration } from '@life/shared/task';

	import DayTaskItem from './day-task-item/DayTaskItem.svelte';

	interface Props {
		tasks: Task[];
		close: () => void;
		date: Date;
	}

	let { tasks, close, date }: Props = $props();

	let uncompletedTasks = $derived(tasks.filter((toDo) => toDo.isDone === false));

	let uncompletedDuration = $derived(getTotalDuration(uncompletedTasks));

	let doneDuration = $derived(getTotalDuration(tasks.filter((toDo) => toDo.isDone === true)));

	$effect(() => {
		if (tasks.length === 0) {
			close();
		}
	});
</script>

<div
	class="relative flex h-auto max-h-[90%] w-11/12 max-w-[543px] flex-col divide-y divide-gray-400 rounded-lg border-gray-400 bg-gray-50 text-sm leading-6 shadow-xs dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:scheme-dark"
>
	<div class="flex-none p-6 font-semibold">
		<LText>Pending Tasks</LText>
		<div class="mt-1 flex justify-between">
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
