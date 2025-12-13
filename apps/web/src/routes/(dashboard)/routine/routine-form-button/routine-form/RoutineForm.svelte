<script lang="ts">
	import { IconSelector, LInput } from '@life/shared';

	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import type { Routine } from '$lib/routine/routine.model.js';
	import {
		durations,
		periods,
		routineDurationMap,
		routineTimeMap,
	} from '$lib/routine/routine.model.js';

	interface Props {
		routineIn: Routine;
	}

	let { routineIn = $bindable() }: Props = $props();
</script>

<div class="flex flex-col gap-2 text-gray-700">
	<!--name-->
	<LInput
		class="flex-1"
		autocomplete="off"
		inputClass="w-full"
		placeholder="Name"
		bind:value={routineIn.name}
	/>

	<!--time-->
	<Select
		class="flex items-center gap-2"
		label="Time"
		labelClass="shrink-0 w-1/4"
		selectClass="flex-1"
		bind:value={routineIn.time}
	>
		{#snippet placeholder()}
			{@render timeItem(routineIn.time)}
		{/snippet}
		{#each periods as time (time)}
			<SelectItem value={time}>{@render timeItem(time)}</SelectItem>
		{/each}
	</Select>

	{#snippet timeItem(time: Routine['time'])}
		{@const item = routineTimeMap[time]}
		{#if item}
			<div class="flex items-center gap-3">
				<item.icon class="size-6" />
				{item.label}
			</div>
		{:else}
			<div>no time set</div>
		{/if}
	{/snippet}

	<Select
		class="flex items-center gap-2"
		label="Duration"
		labelClass="shrink-0 w-1/4"
		selectClass="flex-1"
		bind:value={routineIn.duration}
	>
		{#snippet placeholder()}
			{@render durationIcon(routineIn.duration)}
		{/snippet}
		{#each durations as duration (duration)}
			<SelectItem value={duration}>{@render durationIcon(duration)}</SelectItem>
		{/each}
	</Select>

	<div class="rounded-lg border border-gray-200 p-2">
		<Toggle
			class="flex w-full justify-between gap-2"
			label="Is disabled"
			offColorBackground="bg-indigo-500"
			onColorBackground="bg-red-500"
			bind:value={routineIn.isDisabled}
		/>
	</div>

	{#snippet durationIcon(duration: Routine['duration'])}
		{#if duration}
			{@const item = routineDurationMap[duration]}
			<div class="flex items-center gap-3">
				<item.icon class="size-6" />
				{item.label}
			</div>
		{:else}
			<div>no duration set</div>
		{/if}
	{/snippet}

	<!--icon-->
	<IconSelector name="icon" bind:value={routineIn.icon} />
</div>
