<script lang="ts">
	import { Button, ModalForm } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { isRecurring, isUntimed } from '@life/shared/task';
	import { Plus } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	import { addTask } from '$lib/task/task.repository';
	import {
		deletePossibleSingleRecurringEvent,
		editTaskWithPrompt,
		taskIn,
	} from '$lib/task/task-form/service.svelte';
	import TaskFormCore from '$lib/task/task-form/task-form-core/TaskFormCore.svelte';
	import TaskFormEvent from '$lib/task/task-form/task-form-event/TaskFormEvent.svelte';
	import TaskFormDropDown from '$lib/task/task-form/task-form-header/TaskFormDropDown.svelte';
	import TaskFormRecurring from '$lib/task/task-form/task-form-recurring/TaskFormRecurring.svelte';
	import { checkErrors, convertToTask, convertToTaskIn } from '$lib/task/task-in-utils';
	import { currentUser } from '$lib/user/user.utils.svelte';

	interface Props {
		task: Task;
		targetDate?: string;
		children?: Snippet;
		color?: 'indigo' | 'red' | 'white' | 'none' | 'dark' | 'light';
		class?: string;
		padding?: string;
	}

	let { task, targetDate, children, color, class: klass, padding }: Props = $props();

	taskIn.value = convertToTaskIn(task);

	let errorMessage = $state('');

	let isOpen = $state(false);

	export function close() {
		isOpen = false;
	}

	export function open() {
		taskIn.value = convertToTaskIn(task);
		isOpen = true;
	}

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

<Button class={klass} {color} onclick={open} {padding}>
	{#if children}
		{@render children()}
	{:else}
		<Plus class="size-4" />
		New Task
	{/if}
</Button>

<ModalForm
	name={isUntimed(task) ? 'Task' : 'Event'}
	{close}
	{errorMessage}
	isEditing={!!task.id}
	onDelete={removeTask}
	{onSubmit}
	bind:isOpen
>
	{#snippet header()}
		<TaskFormDropDown {close} {task} />
	{/snippet}

	<div class="flex flex-col gap-2 text-sm text-gray-700">
		<TaskFormCore />

		<TaskFormEvent />

		<TaskFormRecurring />
	</div>
</ModalForm>
