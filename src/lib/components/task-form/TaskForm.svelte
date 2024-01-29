<script lang="ts">
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import { categories } from '$lib/category/store';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { createModal } from '$lib/components/dialog/service';
	import Modal from '$lib/components/modal/Modal.svelte';
	import DefaultSection from '$lib/components/task-form/default-section/DefaultSection.svelte';
	import EventSection from '$lib/components/task-form/event-section/EventSection.svelte';
	import { UnknownError } from '$lib/consts';
	import { removeTask, updateTasks } from '$lib/task/store';
	import type { SubSubmitFunction } from '$lib/types-utils';
	import { createEventDispatcher } from 'svelte';
	import { formatDates, isEventsDateInverted } from './service';
	import type { TaskIn } from './service';
	import 'flatpickr/dist/themes/airbnb.css';

	export let show: boolean;

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

	const dispatch = createEventDispatcher<{ close: null }>();

	const handleDelete: SubSubmitFunction<TaskIn> = async () => {
		const result = await createModal({ title: 'Are you sure?' });

		if (!result) {
			return () => {};
		}
		dispatch('close');

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && result.data?.removed) {
				removeTask(result.data.removed);
			} else if (result.type === 'error') {
				console.log(result.error || UnknownError);
			}
		};
	};

	const handleCreate: SubSubmitFunction<TaskIn> = ({ formData, data: task }) => {
		formatDates(task, formData);

		dispatch('close');

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && result.data?.created) {
				updateTasks(result.data.created);
			} else if (result.type === 'error') {
				console.log(result.error || UnknownError);
			}
		};
	};

	const handleEdit: SubSubmitFunction<TaskIn> = async ({ formData, data: task }) => {
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
		dispatch('close');

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && result.data?.updated) {
				updateTasks(result.data.updated);
			} else if (result.type === 'error') {
				console.log(result.error || UnknownError);
			}
		};
	};

	const submit: SubmitFunction = async ({ formData, action }) => {
		if (action.search === DELETE_ACTION) {
			return handleDelete({ formData, data: task });
		} else if (action.search === CREATE_ACTION) {
			return handleCreate({ formData, data: task });
		} else if (action.search === UPDATE_ACTION) {
			return handleEdit({ formData, data: task });
		}
	};
</script>

<Modal {show} on:close>
	<form
		method="POST"
		action={isEditing ? UPDATE_ACTION : CREATE_ACTION}
		use:enhance={submit}
		class="w-[355px] shadow rounded-md overflow-hidden relative"
	>
		<div class="bg-neutral-100 px-4 py-5 sm:p-4">
			<div class="flex justify-between items-center pb-2">
				<h2 class="text-lg font-medium text-gray-900">{formName}</h2>
				<button
					type="button"
					class="pl-2 inline-flex rounded-md p-1.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
					on:click={() => dispatch('close')}
				>
					<span class="sr-only">Dismiss</span>
					<Icon src={XMark} class="h-5 w-5" aria-hidden="true" />
				</button>
			</div>

			<Alert type="error" isVisible={!!error} hasCloseButton={false}>{error}</Alert>

			<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
				<DefaultSection {task} {targetDate} />

				<EventSection {task} />
			</div>
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
</Modal>
