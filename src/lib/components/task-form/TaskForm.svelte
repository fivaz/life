<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { categories } from '$lib/category/store';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import DefaultSection from '$lib/components/task-form/default-section/DefaultSection.svelte';
	import EventSection from '$lib/components/task-form/event-section/EventSection.svelte';
	import type { ActionData } from '../../../../.svelte-kit/types/src/routes/dashboard/home/$types';
	import {
		handleCreate,
		handleDelete,
		handleEdit,
		isEventsDateInverted,
	} from './service';
	import type { TaskIn } from './service';
	import 'flatpickr/dist/themes/airbnb.css';

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

	const submit: SubmitFunction = async ({ formData, action }) => {
		if (action.search === DELETE_ACTION) {
			return handleDelete({ formData, data: task, form });
		} else if (action.search === CREATE_ACTION) {
			return handleCreate({ formData, data: task, form });
		} else if (action.search === UPDATE_ACTION) {
			return handleEdit({ formData, data: task, form });
		}
	};
</script>

<form
	method="POST"
	action={isEditing ? UPDATE_ACTION : CREATE_ACTION}
	use:enhance={submit}
	class="w-[355px] shadow rounded-md overflow-hidden relative"
>
	<div class="flex flex-col gap-2 px-4 py-5 bg-neutral-100 sm:p-6">
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
