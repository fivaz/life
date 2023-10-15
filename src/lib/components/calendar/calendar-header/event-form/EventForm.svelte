<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import {
		getDateFromForm,
		getTimeFrom,
		updateDate
	} from '$lib/components/calendar/calendar-header/event-form/service';
	import { update } from '$lib/store/events';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../../.svelte-kit/types/src/routes/$types';
	import Button from '../../../button/Button.svelte';

	let creating = false;
	export let form: ActionData | null = null;

	$: formDate = getDateFromForm(form?.startDate);
	$: formStartTime = getTimeFrom(form?.startDate);
	$: formEndTime = getTimeFrom(form?.endDate);

	let error = '';

	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	action="?/submit"
	use:enhance={({ formData }) => {
		try {
			creating = true;
			updateDate(formData);

			return async ({ result }) => {
				creating = false;
				await applyAction(result);
				if (result.type === 'success') {
					if (form !== null && form.error === undefined) {
						update(form);
						dispatch('submit');
					}
				} else {
					error = form?.error || '';
				}
			};
		} catch (e) {
			error = 'Invalid date';
		}
	}}
	class="w-[336px] shadow rounded-md overflow-hidden"
>
	<div class="flex flex-col gap-3 px-4 py-5 bg-white sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">Add Event</h2>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}

		<input type="hidden" name="id" value={form?.id || ''} />
		<input type="hidden" name="isDone" value={form?.isDone || false} />

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
					value={formDate}
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
						value={formStartTime}
					/>
				</label>
			</div>

			<div class="col-span-2">
				<label class="block text-sm font-medium text-gray-700 mb-1">
					End time
					<input
						type="time"
						name="endTime"
						value={formEndTime}
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
