<script lang="ts">
	import { Button } from '@life/shared';
	import { formatDate, parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { getTotalDuration } from '@life/shared/task';
	import { Clipboard, ClipboardCopy, ClipboardList } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { addDays, addWeeks, lastDayOfWeek, parse, subDays } from 'date-fns';
	import { PlusIcon } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import type { Goal } from '$lib/goal/goal.model';
	import {
		buildTimedTask,
		buildUntimedTask,
		buildUntimedTaskWithDateSet,
	} from '$lib/task/build-utils';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';
	import { DATE_FR } from '$lib/utils.svelte';

	import { GROUPS } from '../service';
	import { TASK_LIST_CLASS } from './task-row/service';
	import TaskRow from './task-row/TaskRow.svelte';

	interface Props {
		label: string;
		tasks: Task[];
		goals: Goal[];
		categories: Category[];
	}

	let { label, tasks, goals, categories }: Props = $props();

	function getNewTask() {
		const dateString = getDate(label);
		if (dateString) {
			const date = parseDate(dateString);
			return buildUntimedTaskWithDateSet(categories, date);
		} else {
			return buildTimedTask(categories);
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

		<div class="flex items-center gap-2">
			<div>{getTotalDuration(tasks)}</div>

			{#if isNotRecurrent}
				<TaskFormButton {categories} color="white" {goals} padding="py-1 px-1.5" task={newTask}>
					<PlusIcon class="size-4" />
				</TaskFormButton>
			{/if}
		</div>
	</div>
	<ul
		class={clsx('flex flex-col gap-1', { [TASK_LIST_CLASS]: isDroppable })}
		data-date={isNotRecurrent && getDate(label)}
	>
		{#each tasks as task (task.id)}
			<!--recurring tasks shouldn't be draggable-->
			<TaskRow {categories} {goals} isDraggable={isNotRecurrent} {task} />
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
