<script lang="ts">
	// eslint-disable-next-line import/no-unresolved
	import { enhance, applyAction } from '$app/forms';
	import { add } from '$lib/store/events';
	import { addMinutes, format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/$types';
	import Button from '../../../button/Button.svelte';

	let creating = false;
	export let form: ActionData | null = null;

	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	action="?/add"
	use:enhance={() => {
		creating = true;
		return async ({ update, result }) => {
			creating = false;
			await applyAction(result);
			if (result.type === 'success') {
				if (form !== null && form.error === undefined) {
					add(form);
					dispatch('submit');
				}
			}
		};
	}}
	class="w-[336px] shadow rounded-md overflow-hidden"
>
	<div class="flex flex-col gap-3 px-4 py-5 bg-white sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">Add Event</h2>

		{#if form?.error}
			<p class="text-red-500">{form.error}</p>
		{/if}

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Name
				<input
					autocomplete="off"
					name="name"
					value={form?.name || ''}
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</label>
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Description
				<textarea
					name="description"
					value={typeof form?.description === 'string' ? form?.description : ''}
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</label>
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Start
				<input
					type="date"
					name="date"
					value={form?.date || format(new Date(), 'yyyy-MM-dd')}
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</label>
		</div>

		<div class="grid grid-cols-4 gap-3">
			<div class="col-span-2">
				<label class="block text-sm font-medium text-gray-700 mb-1">
					Start time
					<input
						type="time"
						name="startTime"
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						value={form?.startTime || format(new Date(), 'hh:mm')}
					/>
				</label>
			</div>

			<div class="col-span-2">
				<label class="block text-sm font-medium text-gray-700 mb-1">
					End time
					<input
						type="time"
						name="endTime"
						value={form?.endTime || format(addMinutes(new Date(), 15), 'hh:mm')}
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</label>
			</div>
		</div>
	</div>

	<div class="flex justify-end px-4 py-3 bg-gray-50 text-right sm:px-6">
		<Button
			isLoading={creating}
			className="focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500"
			type="submit"
		>
			Add
		</Button>
	</div>
</form>
