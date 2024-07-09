<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import DayTasksList from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/tasks-summary/day-tasks-list/DayTasksList.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { clsx } from 'clsx';

	export let tasks: AnyTask[];

	let isOpen = false;

	$: workTasks = tasks.filter((task) => task.category.type === 'work');

	$: hasPendingToDos = workTasks.some((task) => task.isDone === false);

	function getLabel(tasks: AnyTask[]): string {
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

<!--there is a bug here that this truncate won't work if not inside a relative -> absolute hierarchy-->
<div class="relative">
	{#if workTasks.length}
		<button
			class={clsx(
				hasPendingToDos
					? 'bg-orange-50 text-orange-500 hover:bg-orange-100'
					: 'bg-cyan-50 text-cyan-500 hover:bg-cyan-100',
				'absolute w-full truncate rounded-lg px-2 py-1 text-xs leading-5 hover:font-semibold',
			)}
			on:click={() => (isOpen = true)}
		>
			{getLabel(workTasks)}
		</button>
	{/if}
</div>

<Modal on:close={() => (isOpen = false)} show={isOpen}>
	<DayTasksList on:close={() => (isOpen = false)} on:editTask on:persistToDos tasks={workTasks} />
</Modal>
