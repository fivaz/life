<script lang="ts">
	import Button from '$lib/components/form/button/Button2.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import { type Routine } from '$lib/routine/utils';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import IconSelector from '../../goals/goal-form/icon-selector/IconSelector.svelte';
	import { addRoutine, deleteRoutine, editRoutine } from './service';

	interface Props {
		userId: string;
		routine: Routine;
		close: () => void;
	}

	let { userId, routine, close }: Props = $props();

	let routineIn = $state({ ...routine });

	let isEditing = $derived(!!routine.id);

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		const { id, ...data } = routineIn;

		if (id) {
			editRoutine(id, data, userId);
		} else {
			addRoutine(data, userId);
		}
		close();
	}
</script>

<form
	class="relative w-[355px] overflow-hidden rounded-md text-sm font-medium shadow"
	onsubmit={onSubmit}
>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex items-center justify-between pb-2">
			<h2 class="text-lg font-medium text-gray-900">
				{isEditing ? 'Edit Routine' : 'Add Routine'}
			</h2>
			<button
				class="inline-flex rounded-md p-1.5 pl-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
				onclick={close}
				type="button"
			>
				<span class="sr-only">Dismiss</span>
				<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
			</button>
		</div>

		<div class="flex flex-col gap-2 text-gray-700">
			<Input autocomplete="off" bind:value={routineIn.name} class="flex-1" placeholder="Name" />

			<IconSelector bind:value={routineIn.icon} name="icon" />
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				confirm={() => deleteRoutine(routine.id, userId, close)}
				type="button"
			>
				Delete
			</ConfirmButton>
		{:else}
			<div></div>
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
