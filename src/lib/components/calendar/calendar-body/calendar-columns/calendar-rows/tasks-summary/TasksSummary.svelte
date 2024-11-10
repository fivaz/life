<script lang="ts">
	import { clsx } from 'clsx';

	import DayTasksList from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/tasks-summary/day-tasks-list/DayTasksList.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { CalendarTask, Task } from '$lib/task/utils';

	interface Props {
		tasks: CalendarTask[];
		class?: string;
		style?: string;
		date: Date;
	}

	let { tasks, style, class: klass, date }: Props = $props();

	let isOpen = $state(false);

	let workTasks = $derived(tasks.filter((task) => task.category.type === 'work'));

	let hasPendingToDos = $derived(workTasks.some((task) => task.isDone === false));

	function getLabel(tasks: Task[]): string {
		if (tasks.length === 0) {
			return '';
		}
		if (tasks.every((toDo) => toDo.isDone === true)) {
			return `${tasks.length} tasks`;
		}
		const pendingToDos = tasks.filter((toDo) => toDo.isDone === false).length;
		return `${pendingToDos} / ${tasks.length} tasks`;
	}
</script>

{#if workTasks.length}
	<button
		{style}
		class={clsx(
			klass,
			hasPendingToDos
				? 'bg-orange-50 text-orange-500 hover:bg-orange-100'
				: 'bg-cyan-50 text-cyan-500 hover:bg-cyan-100',
			'rounded-lg px-2 py-1 text-center text-xs leading-5 hover:font-semibold',
		)}
		onclick={() => (isOpen = true)}
	>
		{getLabel(workTasks)}
	</button>
{/if}

<Modal bind:isOpen>
	<DayTasksList {date} close={() => (isOpen = false)} tasks={workTasks} />
</Modal>
