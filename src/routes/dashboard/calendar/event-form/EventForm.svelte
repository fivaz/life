<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance, applyAction } from '$app/forms';
	import type { CCategory } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { removeEvent, updateEvent } from '$lib/event/store';
	import { TIME } from '$lib/utils';
	import { isAfter, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/$types';
	import type { EventIn } from '../service';
	import { getDuration, getEndTime } from './service';

	export let categories: CCategory[];
	export let form: ActionData | null;

	export let event: EventIn;

	$: error = !isAfter(
		parse(event.endTime, TIME, new Date()),
		parse(event.startTime, TIME, new Date()),
	);

	$: categoryName =
		categories.find((category) => category.id === event.categoryId)?.name ||
		'create a category first';

	const dispatch = createEventDispatcher();

	export const submit: SubmitFunction = () => {
		dispatch('submit');
		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success') {
				if (form?.removed) {
					removeEvent(form.removed);
				} else if (form?.saved) {
					updateEvent(form.saved);
				}
			} else {
				if (form?.error) {
					console.log(form?.error);
				}
			}
		};
	};
</script>

<form
	method="POST"
	action="?/save"
	use:enhance={submit}
	class="w-[336px] shadow rounded-md overflow-hidden relative"
>
	<div class="flex flex-col gap-3 px-4 py-5 bg-white sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">
			{#if event.id}
				Edit Event
			{:else}
				Add Event
			{/if}
		</h2>

		{#if error}
			<p class="text-red-500">startDate should be before endDate</p>
		{/if}

		<input type="hidden" name="id" value={event.id} />
		<input type="hidden" name="isDone" value={event.isDone} />
		<input type="hidden" name="categoryName" value={categoryName} />

		<Input
			label="Name"
			autocomplete="off"
			name="name"
			bind:value={event.name}
			class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		/>

		<Select bind:value={event.categoryId} name="categoryId">
			<span slot="placeholder">{categoryName}</span>
			{#each categories as category (category)}
				<SelectItem value={category.id}>{category.name}</SelectItem>
			{/each}
		</Select>

		<label class="block text-sm font-medium text-gray-700 mb-1">
			Description
			<textarea
				name="description"
				bind:value={event.description}
				class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</label>

		<div class="grid grid-cols-4 gap-3">
			<Input
				labelClass="col-span-2"
				label="Date"
				type="date"
				name="date"
				bind:value={event.date}
				required
				class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>

			<Input
				labelClass="col-span-2"
				label="Duration"
				type="time"
				name="duration"
				required
				bind:value={event.duration}
				on:input={(e) => (event.endTime = getEndTime(event.startTime, e.detail))}
			/>
		</div>

		<div class="grid grid-cols-4 gap-3">
			<Input
				labelClass="col-span-2"
				label="Start time"
				type="time"
				name="startTime"
				required
				bind:value={event.startTime}
			/>

			<Input
				labelClass="col-span-2"
				label="End time"
				type="time"
				name="endTime"
				required
				bind:value={event.endTime}
				on:input={(e) => (event.duration = getDuration(event.startTime, e.detail))}
			/>
		</div>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if event.id}
			<Button formaction="?/remove" color="red">Delete</Button>
		{:else}
			<div />
		{/if}

		<Button disabled={error} type="submit">
			{#if event.id} Edit {:else} Add {/if}
		</Button>
	</div>
</form>
