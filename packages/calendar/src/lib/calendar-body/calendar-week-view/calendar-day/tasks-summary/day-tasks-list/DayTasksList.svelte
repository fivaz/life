<script lang="ts">
	import { DATE, formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { getTotalDuration, isRecurring, isTimed } from '@life/shared/task';
	import { addDays, parse } from 'date-fns';

	import { getPersistTasks } from '../../../../../context.utils.js';
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

	const persistTasks = getPersistTasks();

	$effect(() => {
		if (tasks.length === 0) {
			close();
		}
	});

	function postponeRemainingUntimedTasks() {
		const untimedTasks = uncompletedTasks.filter((task) => !isTimed(task));

		const untimedTasksUpdated = untimedTasks.map((task) => {
			if (isRecurring(task)) {
				return { ...task, recurringExceptions: [...task.recurringExceptions, formatDate(date)] };
			} else {
				const dayAfter = formatDate(addDays(parse(task.date, DATE, new Date()), 1));
				return { ...task, date: dayAfter };
			}
		});

		persistTasks(untimedTasksUpdated);
	}
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

	<div class="flex-none p-6">
		{#if uncompletedTasks.length}
			<button class="font-semibold hover:underline" onclick={postponeRemainingUntimedTasks}>
				Postpone remaining unset tasks <span aria-hidden="true">&rarr;</span>
			</button>
		{/if}
	</div>
</div>
