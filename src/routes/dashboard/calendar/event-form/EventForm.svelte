<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance, applyAction } from '$app/forms';
	import type { CCategory } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { removeEvent, updateEvent } from '$lib/event/store';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/$types';
	import { add15Minutes, getDate, getEndTime, getStartTime } from './service';

	export let categories: CCategory[];
	export let form: ActionData | null;

	let loading = false;

	let error = '';

	let date = getDate(form);
	let startTime = getStartTime(form);
	let endTime = getEndTime(form);
	let categoryId =
		categories.find((category) => category.id === form?.saved?.categoryId)?.id ||
		categories.find((category) => category.isDefault)?.id ||
		categories[0].id;

	$: categoryName = categories.find((category) => category.id === categoryId)?.name || '';

	const dispatch = createEventDispatcher();

	const submit: SubmitFunction = () => {
		try {
			loading = true;
			return async ({ result }) => {
				await applyAction(result);
				if (result.type === 'success') {
					if (form?.removed) {
						removeEvent(form.removed);
					} else if (form?.saved) {
						updateEvent(form.saved);
					}
					dispatch('submit');
				} else {
					if (form?.error) {
						error = form.error;
					}
				}
				loading = false;
			};
		} catch (e) {
			error = e instanceof Error ? e.message : 'unknown error';
			loading = false;
		}
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
			{#if form?.saved?.id}
				Edit Event
			{:else}
				Add Event
			{/if}
		</h2>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}

		<input type="hidden" name="id" value={form?.saved?.id || ''} />
		<input type="hidden" name="isDone" value={form?.saved?.isDone || false} />
		<input type="hidden" name="categoryName" value={categoryName} />

		<Input
			label="Name"
			autocomplete="off"
			name="name"
			value={form?.saved?.name || ''}
			class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		/>

		<Select bind:value={categoryId} name="categoryId">
			<span slot="placeholder">{categoryName}</span>
			{#each categories as category (category)}
				<SelectItem value={category.id}>{category.name}</SelectItem>
			{/each}
		</Select>

		<label class="block text-sm font-medium text-gray-700 mb-1">
			Description
			<textarea
				name="description"
				value={form?.saved?.description || null}
				class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</label>

		<Input
			label="Date"
			type="date"
			name="date"
			value={date}
			class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		/>

		<div class="grid grid-cols-4 gap-3">
			<Input
				labelClass="col-span-2"
				label="Start time"
				type="time"
				name="startTime"
				value={startTime}
				on:input={(e) => (endTime = add15Minutes(e.detail))}
			/>

			<Input labelClass="col-span-2" label="End time" type="time" name="endTime" value={endTime} />
		</div>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if form?.saved?.id}
			<Button disabled={loading} formaction="?/remove" color="red">Delete</Button>
		{:else}
			<div />
		{/if}

		<Button disabled={loading} type="submit">
			{#if form?.saved?.id} Edit {:else} Add {/if}
		</Button>
	</div>

	<Loading {loading} class="h-8 w-8 text-indigo-500" />
</form>
