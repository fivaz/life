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
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';

	export let userId: string;
	export let categories: Category[];
	export let targetDate: string | undefined = undefined;
	export let editingTask: AnyTask;
	export let show: boolean;

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

	let goalType: Goal;
</script>

<TypedCollection let:data={goals} ref={`users/${userId}/goals`} type={goalType}>
	<Modal on:close={() => close()} {show}>
		<TaskForm
			{categories}
			{goals}
			on:close={() => close()}
			on:createTask={(e) => createTask(userId, e.detail.data, e.detail.file)}
			on:editTask={(e) =>
				editTask({
					userId,
					...e.detail,
				})}
			on:removeTask={(e) => removeTask(userId, e.detail.task, e.detail.targetDate)}
			{targetDate}
			task={editingTask}
		/>
	</Modal>
</TypedCollection>
