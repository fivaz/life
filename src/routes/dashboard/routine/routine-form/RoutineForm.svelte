<script lang="ts">
	import Button from '$lib/components/form/button/Button.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { type Routine } from '$lib/routine/utils';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createEventDispatcher } from 'svelte';

	import IconSelector from '../../goals/goal-form/icon-selector/IconSelector.svelte';
	import { addRoutine, deleteRoutine, editRoutine } from './service';

	export let userId: string;

	export let routine: Routine;

	export let routinesLength: number;

	let routineIn = { ...routine };

	$: isEditing = !!routine.id;

	const dispatch = createEventDispatcher<{ close: null }>();

	function onSubmit() {
		const { id, ...data } = routineIn;

		if (id) {
			editRoutine(id, data, userId);
		} else {
			addRoutine(data, userId);
		}
		dispatch('close');
	}
</script>

<form
	class="relative w-[355px] overflow-hidden rounded-md text-sm font-medium shadow"
	on:submit|preventDefault={onSubmit}
>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex items-center justify-between pb-2">
			<h2 class="text-lg font-medium text-gray-900">
				{#if isEditing}
					Edit Routine
				{:else}
					Add Routine
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

		<div class="flex flex-col gap-2 text-gray-700">
			<div class="flex gap-2">
				<Input autocomplete="off" bind:value={routineIn.name} class="flex-1" placeholder="Name" />

				<Select bind:value={routineIn.order} class="w-24">
					<span slot="placeholder">{routineIn.order || 'Position'}</span>
					{#each Array.from({ length: routinesLength }, (_, i) => i + 1) as position (position)}
						<SelectItem value={position}>{position}</SelectItem>
					{/each}
				</Select>
			</div>

			<IconSelector bind:value={routineIn.icon} name="icon" />
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				on:confirm={() => deleteRoutine(routine.id, userId, dispatch)}
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
