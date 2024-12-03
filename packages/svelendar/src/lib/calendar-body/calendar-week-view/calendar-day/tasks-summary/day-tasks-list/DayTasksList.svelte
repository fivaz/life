<script lang="ts">
	import { DATE, formatDate, parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { getTotalDuration, isRecurring, isTimed, sortTasks } from '@life/shared/task';
	import { addDays, parse } from 'date-fns';

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
	class="relative flex h-auto max-h-[90%] w-11/12 max-w-[543px] flex-col divide-y divide-gray-900/5 rounded-lg bg-gray-50 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/5"
>
	<div class="flex-none p-6 font-semibold">
		<div>Pending Tasks</div>
		<div class="mt-1 flex justify-between">
			<div><span class="text-green-500">{doneDuration}</span> done</div>
			{#if uncompletedTasks.length}
				<div><span class="text-red-500">{uncompletedDuration}</span> to complete</div>
			{/if}
		</div>
	</div>

	<ul class="overflow-auto py-3">
		{#each tasks as task, index (task)}
			<DayTaskItem {date} {index} {task} />
		{/each}
	</ul>
</div>
