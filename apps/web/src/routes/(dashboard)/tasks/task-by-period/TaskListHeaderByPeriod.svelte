<script lang="ts">
	import { LText } from '@life/shared';
	import { parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { getTotalDuration } from '@life/shared/task';
	import { ClipboardIcon, ClipboardListIcon, PlusIcon } from 'lucide-svelte';

	import { categories } from '$lib/category/category.svelte';
	import { buildTimedTask, buildUntimedTaskWithDateSet } from '$lib/task/build-utils';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';

	import type { TaskLists, TaskListType } from '../service';
	import { getNewTaskFromPeriod } from './service.svelte';

	interface Props {
		period: string | TaskListType;
		tasksByPeriod: TaskLists;
	}

	let { period, tasksByPeriod = $bindable() }: Props = $props();

	let newTask = $state<Task>(getNewTaskFromPeriod(period));

	$effect(() => {
		newTask = getNewTaskFromPeriod(period);
	});

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

<div class="flex justify-between font-semibold">
	<div
		class="flex items-center gap-2 {period === 'overdue'
			? 'text-red-500'
			: 'text-gray-700 dark:text-gray-100'}"
	>
		{#if tasksByPeriod[period].length}
			<ClipboardListIcon class="size-5" />
		{:else}
			<ClipboardIcon class="size-5" />
		{/if}
		<span class="font-semibold">{getLabel(period)}</span>
		<span>{getNumberOfTasks(tasksByPeriod[period])}</span>
	</div>

	<div class="flex items-center gap-2">
		<LText>{getTotalDuration(tasksByPeriod[period])}</LText>

		{#if !(period.startsWith('recurring') || period === 'overdue')}
			<TaskFormButton color="white" padding="py-1 px-1.5" task={newTask}>
				<PlusIcon class="size-4" />
			</TaskFormButton>
		{/if}
	</div>
</div>
