<script lang="ts">
	import { Button } from '@life/ui';

	import CloseX from '$lib/components/close-x/CloseX.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import type { Routine } from '$lib/routine/routine.model';
	import { routineTimeMap, times } from '$lib/routine/routine.model';
	import { addRoutine, deleteRoutine, editRoutine } from '$lib/routine/routine.repository';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import IconSelector from '../../goals/goal-form/icon-selector/IconSelector.svelte';

	interface Props {
		routine: Routine;
		close: () => void;
	}

	let { routine, close }: Props = $props();

	let routineIn = $state({ ...routine });

	let isEditing = $derived(!!routine.id);

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		const { id, ...data } = routineIn;

		if (id) {
			editRoutine(id, data, currentUser.uid);
		} else {
			addRoutine(data, currentUser.uid);
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
			<CloseX {close} />
		</div>

		<div class="flex flex-col gap-2 text-gray-700">
			<!--name-->
			<Input class="flex-1" autocomplete="off" placeholder="Name" bind:value={routineIn.name} />

			{#snippet item(time: Routine['time'])}
				{@const item = routineTimeMap[time]}
				{#if item}
					<div class="flex items-center gap-3">
						<item.icon class="h-6 w-6" />
						{item.label}
					</div>
				{:else}
					<div>no time set</div>
				{/if}
			{/snippet}

			<!--time-->
			<Select
				class="flex items-center"
				label="Time"
				labelClass="w-1/5"
				selectClass="flex-1"
				bind:value={routineIn.time}
			>
				{#snippet placeholder()}
					{@render item(routineIn.time)}
				{/snippet}
				{#each times as time (time)}
					<SelectItem value={time}>{@render item(time)}</SelectItem>
				{/each}
			</Select>

			<!--icon-->
			<IconSelector name="icon" bind:value={routineIn.icon} />
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				confirm={() => deleteRoutine(routine.id, currentUser.uid, close)}
				confirmByKey="Delete"
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
