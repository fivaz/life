<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { ClipboardCopyIcon, ClipboardIcon, ClipboardListIcon } from 'lucide-svelte';
	import { dndzone } from 'svelte-dnd-action';

	import type { TaskListType } from '../service';
	import TaskRow2 from './TaskRow2.svelte';

	interface Props {
		listName: string | TaskListType;
		tasks: Task[];
	}

	let { listName, tasks }: Props = $props();

	function handleDnd({ detail }) {
		const { items, from, to, dragging } = detail;

		// implement logic to update task date if needed
		// e.g., when moving from "today" to "tomorrow"
	}

	let isDroppable = !(listName.startsWith('recurring') || listName === 'overdue');

	const taskListLabels: Record<TaskListType, string> = {
		overdue: 'Overdue',
		today: 'Today',
		tomorrow: 'Tomorrow',
		thisWeek: 'This week',
		nextWeek: 'Next week',
		someday: 'Someday',
		recurringDaily: 'Recurring Daily',
		recurringWeekly: 'Recurring Weekly',
		recurringMonthly: 'Recurring Monthly',
		recurringYearly: 'Recurring Yearly',
	};

	function getLabel(listName: string): string {
		return taskListLabels[listName as TaskListType] || listName;
	}

	export function getNumberOfTasks(tasks: Task[]) {
		if (tasks.length === 0) {
			return '';
		}
		if (tasks.length === 1) {
			return '(1 task)';
		}
		return `(${tasks.length} tasks)`;
	}
</script>

<section
	class="flex flex-col gap-2 divide-gray-300 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900"
>
	<div
		class="flex items-center gap-2 {listName === 'overdue'
			? 'text-red-500'
			: 'text-gray-700 dark:text-gray-100'}"
	>
		{#if tasks.length}
			<ClipboardListIcon class="size-5" />
		{:else}
			<ClipboardIcon class="size-5" />
		{/if}
		<span class="font-semibold">{getLabel(listName)}</span>
		<span>{getNumberOfTasks(tasks)}</span>
	</div>
	{#if tasks.length}
		<ul
			class="flex flex-col gap-2"
			onconsider={handleDnd}
			onfinalize={handleDnd}
			use:dndzone={{
				items: tasks,
				flipDurationMs: 300,
				type: listName,
				dragDisabled: listName.startsWith('recurring'),
				dropFromOthersDisabled: !isDroppable,
			}}
		>
			{#each tasks as task (task.id)}
				<TaskRow2 {task} />
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
