<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { getNumberOfTasks, getTotalDuration } from '$lib/task/time-utils';
	import { Clipboard, ClipboardCopy, ClipboardList } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';

	import { GROUPS } from '../service';
	import TaskRow from './task-row/TaskRow.svelte';
	import { TASK_LIST_CLASS } from './task-row/service';

	export let label: string;
	export let tasks: AnyTask[];
	export let userId: string;

	$: isDroppable = label !== GROUPS.Recurring && label !== GROUPS.Overdue;
</script>

<!--recurring and overdue list shouldn't be droppable-->
<li class="rounded-lg border p-1 text-indigo-700">
	<div class="flex justify-between px-2 py-1 font-semibold">
		<div class="flex items-center justify-center gap-2">
			{#if tasks.length}
				<Icon class="h-5 w-5" src={ClipboardList} />
			{:else}
				<Icon class="h-5 w-5" src={Clipboard} />
			{/if}
			<div>{label}</div>
			<div>{getNumberOfTasks(tasks)}</div>
		</div>
		<div>{getTotalDuration(tasks)}</div>
	</div>
	<ul class={clsx('flex flex-col gap-1', { [TASK_LIST_CLASS]: isDroppable })} data-date={label}>
		{#each tasks as task (task.id)}
			<!--recurring tasks shouldn't be draggable-->
			<TaskRow isDraggable={label !== GROUPS.Recurring} on:edit {task} {userId} />
		{/each}
		{#if isDroppable}
			<li
				class="relative flex h-10 select-none items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-1 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<Icon class="h-5 w-5" src={ClipboardCopy} /> drop a task here
			</li>
		{/if}
	</ul>
</li>
