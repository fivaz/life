<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { Goal } from '$lib/goal/utils';
	import type { Task } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';

	import { db } from '$lib/firebase';
	import { queryUncompletedGoals, sortGoals } from '$lib/goal/utils';
	import { type Writable, writable } from 'svelte/store';
	import { collectionStore } from 'sveltefire';

	interface Props {
		userId: string;
		categories: Category[];
		goals?: Goal[];
		targetDate?: string;
		editingTask: Task;
		isOpen: boolean;
	}

	let {
		userId,
		categories,
		goals = [],
		targetDate,
		editingTask,
		isOpen = $bindable(),
	}: Props = $props();

	let goalsStore: ReturnType<typeof collectionStore<Goal>> | Writable<Goal[]> =
		writable<Goal[]>(goals);

	if (goals.length === 0) {
		goalsStore = collectionStore<Goal>(db, queryUncompletedGoals(userId));
	}

	function close() {
		isOpen = false;
	}
</script>

<Modal {close} {isOpen}>
	<TaskForm
		{userId}
		{categories}
		goals={sortGoals($goalsStore)}
		{close}
		{targetDate}
		task={editingTask}
	/>
</Modal>
