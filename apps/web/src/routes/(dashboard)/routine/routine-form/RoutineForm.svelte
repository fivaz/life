<script lang="ts">
	import { ModalForm } from '@life/shared';

	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
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

	let errorMessage = $state('');

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (routineIn.id) {
			editRoutine(routineIn, currentUser.uid);
		} else {
			addRoutine(routineIn, currentUser.uid);
		}
		close();
	}
</script>

<ModalForm
	name="Routine"
	{close}
	{errorMessage}
	isEditing={!!routine.id}
	onDelete={() => deleteRoutine(routine.id, currentUser.uid, close)}
	{onSubmit}
>
	<div class="flex flex-col gap-2 text-gray-700">
		<!--name-->
		<Input
			class="flex-1"
			autocomplete="off"
			inputClass="w-full"
			placeholder="Name"
			bind:value={routineIn.name}
		/>

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

		<div class="flex items-center justify-between gap-3">
			<!--time-->
			<Select
				class="flex flex-1 items-center gap-2"
				label="Time"
				labelClass="flex-shrink-0"
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

			<!--				<div class="rounded-lg border border-gray-200 p-2">-->
			<Toggle
				label="Is disabled"
				offColorBackground="bg-indigo-500"
				onColorBackground="bg-red-500"
				bind:value={routineIn.isDisabled}
			/>
			<!--				</div>-->
		</div>

		<!--icon-->
		<IconSelector name="icon" bind:value={routineIn.icon} />
	</div>
</ModalForm>
