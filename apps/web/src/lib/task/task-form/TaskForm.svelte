<script lang="ts">
	import { Alert, Button, ConfirmButton } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { isRecurring } from '@life/shared/task';

	import type { Category } from '$lib/category/category.model';
	import type { Goal } from '$lib/goal/goal.model';
	import { addTask } from '$lib/task/task.repository';
	import {
		deletePossibleSingleRecurringEvent,
		editTaskWithPrompt,
		taskIn,
	} from '$lib/task/task-form/service.svelte';
	import TaskFormCore from '$lib/task/task-form/task-form-core/TaskFormCore.svelte';
	import TaskFormEvent from '$lib/task/task-form/task-form-event/TaskFormEvent.svelte';
	import TaskFormHeader from '$lib/task/task-form/task-form-header/TaskFormHeader.svelte';
	import TaskFormRecurring from '$lib/task/task-form/task-form-recurring/TaskFormRecurring.svelte';
	import { checkErrors, convertToTask, convertToTaskIn } from '$lib/task/task-in-utils';
	import { currentUser } from '$lib/user/user.utils.svelte';

	interface Props {
		task: Task;
		goals: Goal[];
		categories: Category[];
		targetDate?: string;
		close: () => void;
	}

	let { task, goals, categories, targetDate, close }: Props = $props();

	taskIn.value = convertToTaskIn(task);

	$inspect(taskIn.value.id);

	let errorMessage = $state('');

	function handleCreateTask(data: Omit<Task, 'id'>) {
		addTask(data, currentUser.uid, taskIn.value.file);
		close();
	}

	async function handleEditTask(data: Omit<Task, 'id'>, id: string) {
		if (
			await editTaskWithPrompt({
				data,
				id,
				file: taskIn.value.file,
				userId: currentUser.uid,
				targetDate,
				formerGoal: task.goal,
				wasRecurring: isRecurring(task),
			})
		) {
			close();
		}
	}

	async function removeTask() {
		if (await deletePossibleSingleRecurringEvent(task, currentUser.uid, targetDate)) {
			close();
		}
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = checkErrors(taskIn.value);
		if (errorMessage) {
			return;
		}

		const { id, ...data } = convertToTask(taskIn.value);

		if (id) {
			handleEditTask(data, id);
		} else {
			handleCreateTask(data);
		}
	}
</script>

<form
	class="relative w-11/12 max-w-[355px] overflow-hidden rounded-md text-start font-medium shadow"
	onsubmit={onSubmit}
>
	<div class="bg-neutral-100 p-4">
		<div class="flex flex-col gap-2 text-sm text-gray-700">
			<TaskFormHeader {close} {task} />

			<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
				{errorMessage}
			</Alert>

			<TaskFormCore {categories} {goals} />

			<TaskFormEvent />

			<TaskFormRecurring />
		</div>
	</div>

	<!--footer-->
	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if task.id}
			<ConfirmButton color="red" confirm={removeTask} confirmByKey="Delete" type="button">
				Delete
			</ConfirmButton>
		{:else}
			<div></div>
		{/if}

		<Button type="submit">
			{#if task.id}
				Edit
			{:else}
				Add
			{/if}
		</Button>
	</div>
</form>
