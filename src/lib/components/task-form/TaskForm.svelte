<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance, applyAction } from '$app/forms';
	import { categories } from '$lib/category/store';
	import Button from '$lib/components/button/Button.svelte';
	import { createModal } from '$lib/components/dialog/service';
	import { UnknownError } from '$lib/consts';
	import { removeTask, updateTasks } from '$lib/task/store';
	import { formatDates, isEventsDateInverted } from './service';
	import type { TaskIn } from './service';
	import 'flatpickr/dist/themes/airbnb.css';
	import { closeModal } from '$lib/form-modal/store';
	import type { SubSubmitFunction } from '$lib/types-utils';
	import type { ActionData } from '../../../../.svelte-kit/types/src/routes/dashboard/home/$types';
	import Alert from '$lib/components/alert/Alert.svelte';
	import DefaultSection from '$lib/components/task-form/default-section/DefaultSection.svelte';
	import EventSection from '$lib/components/task-form/event-section/EventSection.svelte';

	export let form: ActionData | null;

	export let task: TaskIn;

	export let targetDate: Date | null = null;

	$: isEditing = !!task.id;

	const DELETE_ACTION = '?/remove';
	const CREATE_ACTION = '?/create';
	const UPDATE_ACTION = '?/update';

	let error = '';

	$: {
		if (isEventsDateInverted(task)) {
			error = 'start date should be before end date';
		} else if ($categories.length === 0) {
			error = 'create a category first';
		} else {
			error = '';
		}
	}

	$: formName = `${isEditing ? 'Edit' : 'Add'} ${task.isEvent ? 'Event' : 'Task'}`;

	const handleDelete: SubSubmitFunction = async () => {
		const result = await createModal({ title: 'Are you sure?' });

		if (!result) {
			return () => {};
		}
		closeModal();

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && form?.removed) {
				removeTask(form.removed);
			} else {
				console.log(form?.error || UnknownError);
			}
		};
	};

	const handleCreate: SubSubmitFunction = ({ formData }) => {
		formatDates(task, formData);

		closeModal();

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && form?.created) {
				updateTasks(form.created);
			} else {
				console.log(form?.error || UnknownError);
			}
		};
	};

	const handleEdit: SubSubmitFunction = async ({ formData }) => {
		formatDates(task, formData);

		if (task.isEvent) {
			if (task.wasRecurring && task.isRecurring) {
				const result = await createModal({
					title: 'This is a repeating event',
					message: 'Do you want to save the changes for ?',
					confirmText: 'this event only',
					cancelText: 'future events',
				});

				if (result === null) {
					return () => {};
				}

				formData.set('isForThisEventOnly', result ? 'true' : '');
			}
		}
		closeModal();

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && form?.updated) {
				updateTasks(form.updated);
			} else {
				console.log(form?.error || UnknownError);
			}
		};
	};

	const submit: SubmitFunction = async ({ formData, action }) => {
		if (action.search === DELETE_ACTION) {
			return handleDelete({ formData });
		} else if (action.search === CREATE_ACTION) {
			return handleCreate({ formData });
		} else if (action.search === UPDATE_ACTION) {
			return handleEdit({ formData });
		}
	};
</script>

<form
	method="POST"
	action={isEditing ? UPDATE_ACTION : CREATE_ACTION}
	use:enhance={submit}
	class="w-[355px] shadow rounded-md overflow-hidden relative"
>
	<div class="flex flex-col gap-2 px-4 py-5 bg-white sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">
			{formName}
		</h2>

		<Alert type="error" isVisible={!!error} hasCloseButton={false}>{error}</Alert>

		<DefaultSection {task} {targetDate} />

		<EventSection {task} />
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if isEditing}
			<Button formaction={DELETE_ACTION} color="red">Delete</Button>
		{:else}
			<div />
		{/if}

		<Button disabled={error} type="submit">
			{#if isEditing} Edit {:else} Add {/if}
		</Button>
	</div>
</form>
