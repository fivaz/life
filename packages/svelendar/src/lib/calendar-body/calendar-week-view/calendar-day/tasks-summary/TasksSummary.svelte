<script lang="ts">
	import { Modal } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { isRecurring, isTimed } from '@life/shared/task';

	import DayTasksList from './day-tasks-list/DayTasksList.svelte';

	interface Props {
		tasks: Task[];
		class?: string;
		style?: string;
		date: Date;
	}

	let { tasks, style, class: klass, date }: Props = $props();

	let isOpen = $state(false);

	let visibleTasks = $derived(tasks.filter(isTaskVisible));

	let hasPendingToDos = $derived(visibleTasks.some((task) => task.isDone === false));

	function isTaskVisible(task: Task): boolean {
		// if a task is recurring, show only if it's untimed
		return !(isRecurring(task) && isTimed(task));
	}

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

{#if visibleTasks.length}
	<button
		{style}
		class="{klass}
			{hasPendingToDos
			? 'bg-orange-50 text-orange-500 hover:bg-orange-100'
			: 'bg-cyan-50 text-cyan-500 hover:bg-cyan-100'}
			rounded-lg px-2 py-1 text-center text-xs leading-5 hover:font-semibold"
		onclick={() => (isOpen = true)}
	>
		{getLabel(visibleTasks)}
	</button>
{/if}

<Modal bind:isOpen>
	<DayTasksList close={() => (isOpen = false)} {date} tasks={visibleTasks} />
</Modal>
