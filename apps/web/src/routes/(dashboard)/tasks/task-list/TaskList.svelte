<script lang="ts">
	import { LText } from '@life/shared';
	import { formatDate, parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { getTotalDuration } from '@life/shared/task';
	import { clsx } from 'clsx';
	import { addDays, addWeeks, lastDayOfWeek, parse, subDays } from 'date-fns';
	import { ClipboardCopyIcon, ClipboardIcon, ClipboardListIcon, PlusIcon } from 'lucide-svelte';

	import { categoriesStore } from '$lib/category/category.svelte';
	import { buildTimedTask, buildUntimedTaskWithDateSet } from '$lib/task/build-utils';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';
	import { DATE_FR } from '$lib/utils.svelte';

	import { GROUPS } from '../service';
	import { TASK_LIST_CLASS } from './task-row/service';
	import TaskRow from './task-row/TaskRow.svelte';

	interface Props {
		label: string;
		tasks: Task[];
	}

	let { label, tasks }: Props = $props();

	function getNewTask() {
		const dateString = getDate(label);
		if (dateString) {
			const date = parseDate(dateString);
			return buildUntimedTaskWithDateSet(categoriesStore.value, date);
		} else {
			return buildTimedTask(categoriesStore.value);
		}
	}

	let newTask = $state<Task>(getNewTask());

	$effect(() => {
		newTask = getNewTask();
	});

	let isNotRecurrent = $derived(
		label !== GROUPS.DailyRecurring &&
			label !== GROUPS.MonthlyRecurring &&
			label !== GROUPS.YearlyRecurring,
	);

	let isDroppable = $derived(isNotRecurrent && label !== GROUPS.Overdue);

	function getDate(label: string): string {
		if (label === GROUPS.Overdue) {
			return formatDate(subDays(new Date(), 1));
		}
		if (label === GROUPS.Today) {
			return formatDate(new Date());
		}
		if (label === GROUPS.Tomorrow) {
			return formatDate(addDays(new Date(), 1));
		}
		if (label === GROUPS.ThisWeek) {
			return formatDate(lastDayOfWeek(new Date()));
		}
		if (label === GROUPS.NextWeek) {
			return formatDate(lastDayOfWeek(addWeeks(new Date(), 1)));
		}
		if (label === GROUPS.Someday) {
			return '';
		}

		return formatDate(parse(label, DATE_FR, new Date()));
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

<!--recurring and overdue list shouldn't be droppable-->
<li
	class="flex flex-col gap-2 divide-gray-300 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900"
>
	<div class="flex justify-between font-semibold">
		<div
			class="flex items-center gap-2 {label === GROUPS.Overdue
				? 'text-red-500'
				: 'text-gray-700 dark:text-gray-100'}"
		>
			{#if tasks.length}
				<ClipboardListIcon class="size-5" />
			{:else}
				<ClipboardIcon class="size-5" />
			{/if}
			<span>{label}</span>
			<span>{getNumberOfTasks(tasks)}</span>
		</div>

		<div class="flex items-center gap-2">
			<LText>{getTotalDuration(tasks)}</LText>

			{#if isNotRecurrent}
				<TaskFormButton color="none" padding="py-1 px-1.5" task={newTask}>
					<PlusIcon class="size-4" />
				</TaskFormButton>
			{/if}
		</div>
	</div>
	<ul
		class={clsx('flex flex-col gap-2', { [TASK_LIST_CLASS]: isDroppable })}
		data-date={isNotRecurrent && getDate(label)}
	>
		{#each tasks as task (task.id)}
			<!--recurring tasks shouldn't be draggable-->
			<TaskRow isDraggable={isNotRecurrent} {task} />
		{/each}
		{#if isDroppable}
			<LText
				class="relative flex h-10 select-none items-center justify-center gap-2 divide-gray-300 rounded-lg border-2 border-dashed border-gray-300 p-1 hover:border-gray-500 dark:divide-gray-700 dark:border-gray-700"
			>
				<ClipboardCopyIcon class="size-5" /> drop a task here
			</LText>
		{/if}
	</ul>
</li>
