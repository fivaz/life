<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { Goal } from '$lib/goal/utils';
	import type { AnyTask } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import {
		addTask,
		deletePossibleSingleRecurringEvent,
		editTaskWithPrompt,
	} from '$lib/components/task-form/service';
	import { db } from '$lib/firebase';
	import { queryUncompletedGoals, sortGoals } from '$lib/goal/utils';
	import { type Writable, writable } from 'svelte/store';
	import { collectionStore } from 'sveltefire';

	export let userId: string;
	export let categories: Category[];
	export let goals: Goal[] = [];
	export let targetDate: string | undefined = undefined;
	export let editingTask: AnyTask;
	export let show: boolean;

	let goalsStore: ReturnType<typeof collectionStore<Goal>> | Writable<Goal[]> =
		writable<Goal[]>(goals);

	if (goals.length === 0) {
		goalsStore = collectionStore<Goal>(db, queryUncompletedGoals(userId));
	}

	async function removeTask(userId: string, task: AnyTask, targetDate: string | undefined) {
		if (await deletePossibleSingleRecurringEvent(task, userId, targetDate)) {
			close();
		}
	}

	function createTask(userId: string, data: Omit<AnyTask, 'id'>, file: File | null) {
		addTask(data, userId, file);
		close();
	}

	async function editTask(args: {
		data: Omit<AnyTask, 'id'>;
		file: File | null;
		formerGoal: Goal | null;
		id: string;
		targetDate: string | undefined;
		userId: string;
		wasRecurring: boolean;
	}) {
		if (await editTaskWithPrompt(args)) {
			close();
		}
	}

	function close() {
		show = false;
	}
</script>

<Modal on:close={() => close()} {show}>
	<TaskForm
		{categories}
		goals={sortGoals($goalsStore)}
		on:close={() => close()}
		on:createTask={(e) => createTask(userId, e.detail.data, e.detail.file)}
		on:editTask={(e) => editTask({ userId, ...e.detail })}
		on:removeTask={(e) => removeTask(userId, e.detail.task, e.detail.targetDate)}
		{targetDate}
		task={editingTask}
	/>
</Modal>
