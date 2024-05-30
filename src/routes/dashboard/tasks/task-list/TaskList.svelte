<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { getTotalDuration } from '$lib/task/time-utils';
	import { clsx } from 'clsx';
	
import { GROUPS } from '../service';
	import { TASK_LIST_CLASS } from './service';
	import TaskRow from './task-row/TaskRow.svelte';

	export let date: string;
	export let tasks: AnyTask[];
	export let userId: string;

	$: isDroppable = date !== GROUPS.Recurring && date !== GROUPS.Overdue;
</script>

<!--recurring and overdue list shouldn't be droppable-->
<li class="rounded-lg border p-1">
	<div class="flex justify-between px-2 font-semibold">
		<div>{date}</div>
		<div>{getTotalDuration(tasks)}</div>
	</div>
	<ul class={clsx('flex flex-col gap-1', { [TASK_LIST_CLASS]: isDroppable })} data-date={date}>
		{#each tasks as task (task.id)}
			<!--recurring tasks shouldn't be draggable-->
			<TaskRow isDraggable={date !== GROUPS.Recurring} on:edit {task} {userId} />
		{/each}
		{#if isDroppable}
			<li
				class="relative h-10 select-none rounded-lg border-2 border-dashed border-gray-300 p-1 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				drop task here
			</li>
		{/if}
	</ul>
</li>
