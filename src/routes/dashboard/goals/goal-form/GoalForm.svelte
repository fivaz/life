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

	import GoalIcon from './goal-icon/GoalIcon.svelte';
	import { getIcon } from './goal-icon/service';
	import IconSelector from './icon-selector/IconSelector.svelte';
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
	class="relative w-[355px] overflow-hidden rounded-md text-sm font-medium shadow"
	on:submit|preventDefault
	use:form
>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex items-center justify-between pb-2">
			<h2 class="text-lg text-gray-900">
				{#if isEditing}
					Edit Goal
				{:else}
					Add Goal
				{/if}
			</h2>
			<button
				class="inline-flex rounded-md p-1.5 pl-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
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

		<div class="flex flex-col gap-2 text-gray-700">
			<div class="relative">
				<Input inputClass="pr-10" name="name" placeholder="Name" />
				<div class="absolute right-0 top-0 p-2.5">
					<GoalIcon class="h-5" icon={getIcon($data.icon)} />
				</div>
			</div>

			<Input
				class="flex items-center gap-2"
				inputClass="flex-1"
				label="Deadline"
				name="deadline"
				required
				type="date"
			/>

			<div class="rounded-lg border border-gray-200 p-2">
				<Toggle bind:value={$data.isDone} label="Is complete" name="isDone" />
			</div>

			<IconSelector bind:value={$data.icon} name="icon" />
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
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
