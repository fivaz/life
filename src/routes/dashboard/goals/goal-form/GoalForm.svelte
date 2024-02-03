<script lang="ts">
	import { validator } from '@felte/validator-yup';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import type { OptionalId } from '$lib/form-utils';
	import type { Goal } from '$lib/goal/utils';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
	import { object, string } from 'yup';

	import { addGoal, deleteGoal, editGoal } from './service';

	export let userId: string;

	export let goal: OptionalId<Goal>;

	$: isEditing = !!goal.id;

	const dispatch = createEventDispatcher<{ close: null }>();

	const schema = object({
		name: string().required(),
	});

	const { form, data, errors } = createForm({
		extend: [validator({ schema })],
		validateSchema: schema,
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
	});

	$: parsedErrors = Object.values($errors)
		.filter((value) => value)
		.join(', ');
</script>

<form
	use:form
	on:submit|preventDefault
	class="w-[355px] shadow rounded-md overflow-hidden relative"
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
				type="button"
				class="pl-2 inline-flex rounded-md p-1.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
				on:click={() => dispatch('close')}
			>
				<span class="sr-only">Dismiss</span>
				<Icon src={XMark} class="h-5 w-5" aria-hidden="true" />
			</button>
		</div>

		<Alert type="error" isVisible={!!parsedErrors} hasCloseButton={false}>{parsedErrors}</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			<Input class="flex" placeholder="Name" autocomplete="off" name="name" />

			<Input
				class="flex items-center"
				labelClass="w-1/4"
				inputClass="flex-1"
				label="Deadline"
				type="date"
				name="deadline"
				required
			/>

			<div class="border border-gray-200 rounded-lg p-2">
				<Toggle name="isDone" label="Is complete" bind:value={$data.isDone} />
			</div>
		</div>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if isEditing}
			<Button color="red" type="button" on:click={() => deleteGoal(goal.id, userId, dispatch)}>
				Delete
			</Button>
		{:else}
			<div />
		{/if}

		<Button type="submit">
			{#if isEditing} Edit {:else} Add {/if}
		</Button>
	</div>
</form>
