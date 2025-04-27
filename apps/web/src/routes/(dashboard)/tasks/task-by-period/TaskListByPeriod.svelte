<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { ClipboardCopyIcon } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import type { DndEvent } from 'svelte-dnd-action';
	import { dndzone } from 'svelte-dnd-action';

	import type { TaskLists, TaskListType } from '../service';
	import { updateTaskPeriod } from './service.svelte';
	import TaskByPeriod from './TaskByPeriod.svelte';
	import TaskListHeaderByPeriod from './TaskListHeaderByPeriod.svelte';

	const flipDurationMs = 300;

	interface Props {
		listName: string | TaskListType;
		tasksByPeriod: TaskLists;
	}

	let { listName, tasksByPeriod = $bindable() }: Props = $props();

	function handleDndConsider(e: CustomEvent<DndEvent<Task>>) {
		tasksByPeriod[listName] = e.detail.items;
	}

	function handleDndFinalize(e: CustomEvent<DndEvent<Task>>) {
		const { items, info } = e.detail;
		tasksByPeriod[listName] = items;

		updateTaskPeriod(tasksByPeriod, info.id);
	}

	let isDroppable = !(listName.startsWith('recurring') || listName === 'overdue');
</script>

<section
	class="flex flex-col gap-2 divide-gray-300 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900"
>
	<TaskListHeaderByPeriod {listName} {tasksByPeriod} />
	<ul
		class="flex flex-col gap-2"
		onconsider={handleDndConsider}
		onfinalize={handleDndFinalize}
		use:dndzone={{
			items: tasksByPeriod[listName],
			flipDurationMs,
			dragDisabled: listName.startsWith('recurring'),
			dropFromOthersDisabled: !isDroppable,
			dropTargetStyle: {},
		}}
	>
		{#each tasksByPeriod[listName] as task (task.id)}
			<li animate:flip={{ duration: flipDurationMs }}>
				<TaskByPeriod {task} />
			</li>
		{/each}
	</ul>

	{#if isDroppable}
		<li class="pointer-events-none">
			<LText
				class="relative flex h-10 select-none items-center justify-center gap-2 divide-gray-300 rounded-lg border-2 border-dashed border-gray-300 p-1 hover:border-gray-500 dark:divide-gray-700 dark:border-gray-700"
			>
				<ClipboardCopyIcon class="size-5" /> drop a task here
			</LText>
		</li>
	{/if}
</section>
