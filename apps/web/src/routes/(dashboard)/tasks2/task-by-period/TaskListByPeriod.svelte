<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { ClipboardCopyIcon } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	import type { TaskLists, TaskListType } from '../service';
	import TaskByPeriod from './TaskByPeriod.svelte';
	import TaskListHeaderByPeriod from './TaskListHeaderByPeriod.svelte';

	const flipDurationMs = 300;

	interface Props {
		listName: string | TaskListType;
		tasksByPeriod: TaskLists;
	}

	let { listName, tasksByPeriod = $bindable() }: Props = $props();

	function handleDndConsider(e: { detail: { items: Task[] } }) {
		tasksByPeriod[listName] = e.detail.items as Task[];
	}

	function handleDndFinalize(e: { detail: { items: Task[] } }) {
		tasksByPeriod[listName] = e.detail.items;
	}

	let isDroppable = !(listName.startsWith('recurring') || listName === 'overdue');
</script>

<section
	class="flex flex-col gap-2 divide-gray-300 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900"
>
	<TaskListHeaderByPeriod {listName} {tasksByPeriod} />
	{#if tasksByPeriod[listName].length}
		<ul
			class="flex flex-col gap-2"
			onconsider={handleDndConsider}
			onfinalize={handleDndFinalize}
			use:dndzone={{
				items: tasksByPeriod[listName],
				flipDurationMs,
				dragDisabled: listName.startsWith('recurring'),
				dropFromOthersDisabled: !isDroppable,
			}}
		>
			{#each tasksByPeriod[listName] as task (task.id)}
				<li animate:flip={{ duration: flipDurationMs }}>
					<TaskByPeriod {task} />
				</li>
			{/each}
		</ul>
	{/if}

	{#if isDroppable}
		<LText
			class="relative flex h-10 select-none items-center justify-center gap-2 divide-gray-300 rounded-lg border-2 border-dashed border-gray-300 p-1 hover:border-gray-500 dark:divide-gray-700 dark:border-gray-700"
		>
			<ClipboardCopyIcon class="size-5" /> drop a task here
		</LText>
	{/if}
</section>
