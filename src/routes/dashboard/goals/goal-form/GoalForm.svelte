<script lang="ts">
	import type { Goal } from '$lib/goal/utils';

	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import ConfirmButton from '$lib/components/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import { getErrors } from '$lib/form-utils';
	import { validator } from '@felte/validator-yup';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
	import { object, string } from 'yup';

	import { addGoal, deleteGoal, editGoal } from './service';

	export let userId: string;

	export let goal: Goal;

	$: isEditing = !!goal.id;

	const dispatch = createEventDispatcher<{ close: null }>();

	const schema = object({
		name: string().required(),
	});

	const { data, errors, form } = createForm({
		extend: [validator({ schema })],
		initialValues: goal,
		onSubmit: (values) => {
			const { id, ...data } = values;
			if (id) {
				editGoal(id, data, userId);
			} else {
				addGoal(data, userId);
			}
			dispatch('close');
		},
		validateSchema: schema,
	});
</script>

<form
	class="w-[355px] shadow rounded-md overflow-hidden relative"
	on:submit|preventDefault
	use:form
>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex justify-between items-center pb-2">
			<h2 class="text-lg font-medium text-gray-900">
				{#if isEditing}
					Edit Goal
				{:else}
					Add Goal
				{/if}
			</h2>
			<button
				class="pl-2 inline-flex rounded-md p-1.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
				on:click={() => dispatch('close')}
				type="button"
			>
				<span class="sr-only">Dismiss</span>
				<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
			</button>
		</div>

		<Alert hasCloseButton={false} isVisible={!!getErrors($errors)} type="error">
			{getErrors($errors)}
		</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			<Input autocomplete="off" class="flex" name="name" placeholder="Name" />

			<Input
				class="flex items-center"
				inputClass="flex-1"
				label="Deadline"
				labelClass="w-1/4"
				name="deadline"
				required
				type="date"
			/>

			<div class="border border-gray-200 rounded-lg p-2">
				<Toggle bind:value={$data.isDone} label="Is complete" name="isDone" />
			</div>
		</div>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				on:confirm={() => deleteGoal(goal.id, userId, dispatch)}
				type="button"
			>
				Delete
			</ConfirmButton>
		{:else}
			<div />
		{/if}

		<Button type="submit">
			{#if isEditing}
				Edit
			{:else}
				Add
			{/if}
		</Button>
	</div>
</form>
