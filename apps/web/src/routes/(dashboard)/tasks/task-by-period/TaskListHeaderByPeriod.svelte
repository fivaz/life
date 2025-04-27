<script lang="ts">
	import type { Task } from '@life/shared/task';
	import { ClipboardIcon, ClipboardListIcon } from 'lucide-svelte';

	import type { TaskLists, TaskListType } from '../service';

	interface Props {
		listName: string | TaskListType;
		tasksByPeriod: TaskLists;
	}

	let { listName, tasksByPeriod = $bindable() }: Props = $props();

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

	function getNumberOfTasks(tasks: Task[]) {
		if (tasks.length === 0) {
			return '';
		}
		if (tasks.length === 1) {
			return '(1 task)';
		}
		return `(${tasks.length} tasks)`;
	}
</script>

<div>
	<div
		class="flex items-center gap-2 {listName === 'overdue'
			? 'text-red-500'
			: 'text-gray-700 dark:text-gray-100'}"
	>
		{#if tasksByPeriod[listName].length}
			<ClipboardListIcon class="size-5" />
		{:else}
			<ClipboardIcon class="size-5" />
		{/if}
		<span class="font-semibold">{getLabel(listName)}</span>
		<span>{getNumberOfTasks(tasksByPeriod[listName])}</span>
	</div>
</div>
