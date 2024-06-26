<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { DATE, DATE_FR } from '$lib/consts';
	import { getTotalDuration } from '$lib/task/time-utils';
	import { Clipboard, ClipboardCopy, ClipboardList, Plus } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { addDays, addWeeks, format, lastDayOfWeek, parse, subDays } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import { GROUPS } from '../service';
	import TaskRow from './task-row/TaskRow.svelte';
	import { TASK_LIST_CLASS } from './task-row/service';

	export let label: string;
	export let tasks: AnyTask[];
	export let userId: string;

	$: isDroppable = label !== GROUPS.Recurring && label !== GROUPS.Overdue;

	function getDate(label: string): string {
		if (label === GROUPS.Overdue) {
			return format(subDays(new Date(), 1), DATE);
		}
		if (label === GROUPS.Today) {
			return format(new Date(), DATE);
		}
		if (label === GROUPS.Tomorrow) {
			return format(addDays(new Date(), 1), DATE);
		}
		if (label === GROUPS.Week) {
			return format(lastDayOfWeek(new Date(), { weekStartsOn: 1 }), DATE);
		}
		if (label === GROUPS.NextWeek) {
			return format(lastDayOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }), DATE);
		}
		if (label === GROUPS.Someday) {
			return '';
		}

		return format(parse(label, DATE_FR, new Date()), DATE);
	}

	export function getNumberOfTasks(tasks: AnyTask[]) {
		if (tasks.length === 0) {
			return '';
		}
		if (tasks.length === 1) {
			return '(1 task)';
		}
		return `(${tasks.length} tasks)`;
	}

	const dispatch = createEventDispatcher<{ create: string }>();
</script>

<!--recurring and overdue list shouldn't be droppable-->
<li class="rounded-lg border p-1 text-indigo-700">
	<div class="flex justify-between px-2 py-1 font-semibold">
		<div class="flex items-center gap-2">
			{#if tasks.length}
				<Icon class="h-5 w-5" src={ClipboardList} />
			{:else}
				<Icon class="h-5 w-5" src={Clipboard} />
			{/if}
			<div>{label}</div>
			<div>{getNumberOfTasks(tasks)}</div>
		</div>

		<div class="flex gap-2">
			<div>{getTotalDuration(tasks)}</div>

			{#if label !== GROUPS.Recurring}
				<button
					class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					on:click={() => dispatch('create', getDate(label))}
					type="button"
				>
					<Icon class="h-4 w-4" src={Plus} />
				</button>
			{/if}
		</div>
	</div>
	<ul
		class={clsx('flex flex-col gap-1', { [TASK_LIST_CLASS]: isDroppable })}
		data-date={label !== GROUPS.Recurring && getDate(label)}
	>
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
