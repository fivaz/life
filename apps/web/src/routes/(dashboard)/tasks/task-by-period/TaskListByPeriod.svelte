<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { ClipboardCopyIcon } from '@lucide/svelte';
	import { clsx } from 'clsx';
	import { flip } from 'svelte/animate';
	import type { DndEvent } from 'svelte-dnd-action';
	import { dragHandleZone } from 'svelte-dnd-action';

	import type { TaskLists, TaskListType } from '../service';
	import { updateTaskPeriod } from './service.svelte';
	import TaskByPeriod from './TaskByPeriod.svelte';
	import TaskListHeaderByPeriod from './TaskListHeaderByPeriod.svelte';

	const flipDurationMs = 200;

	interface Props {
		period: string | TaskListType;
		tasksByPeriod: TaskLists;
	}

	let { period, tasksByPeriod = $bindable() }: Props = $props();

	function handleDndConsider(e: CustomEvent<DndEvent<Task>>) {
		tasksByPeriod[period] = e.detail.items;
	}

	function handleDndFinalize(e: CustomEvent<DndEvent<Task>>) {
		const { items, info } = e.detail;
		tasksByPeriod[period] = items;

		updateTaskPeriod(tasksByPeriod, info.id);
	}

	let isDroppable = $derived(!(period.startsWith('recurring') || period === 'overdue'));
</script>

<section
	class="flex flex-col gap-2 divide-gray-300 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900"
>
	<TaskListHeaderByPeriod {period} {tasksByPeriod} />
	<ul
		class={clsx('flex flex-col gap-2', { '-mt-2': tasksByPeriod[period].length === 0 })}
		onconsider={handleDndConsider}
		onfinalize={handleDndFinalize}
		use:dragHandleZone={{
			items: tasksByPeriod[period],
			flipDurationMs,
			dragDisabled: period.startsWith('recurring'),
			dropFromOthersDisabled: !isDroppable,
			dropTargetStyle: {},
		}}
	>
		{#each tasksByPeriod[period] as task (task.id)}
			<li animate:flip={{ duration: flipDurationMs }}>
				<TaskByPeriod {task} />
			</li>
		{/each}

		{#if isDroppable}
			<li class="pointer-events-none">
				<LText
					class="relative flex h-10 items-center justify-center gap-2 divide-gray-300 rounded-lg border-2 border-dashed border-gray-300 p-1 select-none hover:border-gray-500 dark:divide-gray-700 dark:border-gray-700"
				>
					<ClipboardCopyIcon class="size-5" /> drop a task here
				</LText>
			</li>
		{/if}
	</ul>
</section>
