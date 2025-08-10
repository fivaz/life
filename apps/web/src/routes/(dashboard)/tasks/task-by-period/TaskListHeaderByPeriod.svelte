<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { getTotalDuration } from '@life/shared/task';
	import { ClipboardIcon, ClipboardListIcon, PlusIcon } from 'lucide-svelte';

	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';

	import { getPeriodLabel } from '../period-labels';
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
		<span class="font-semibold">{getPeriodLabel(period)}</span>
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
