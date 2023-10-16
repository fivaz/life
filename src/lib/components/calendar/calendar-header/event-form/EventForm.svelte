<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import {
		getFields,
		updateDate
	} from '$lib/components/calendar/calendar-header/event-form/service';
	import { removeEvent, updateEvent } from '$lib/store/events';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../../.svelte-kit/types/src/routes/$types';
	import Button from '../../../button/Button.svelte';

	let submitting = false;
	export let form: ActionData | null = null;

	$: fields = getFields(form);

	let error = '';

	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	action="?/save"
	use:enhance={({ formData }) => {
		try {
			submitting = true;
			updateDate(formData);

			return async ({ result }) => {
				await applyAction(result);
				if (result.type === 'success') {
					if (form?.remove) {
						removeEvent(form.data.id);
					} else if (form?.save) {
						updateEvent(form.data);
					}
					dispatch('submit');
				} else {
					if (form?.error) {
						error = form.error;
					}
				}
			};
		} catch (e) {
			error = 'date is invalid';
		} finally {
			submitting = false;
		}
	}}
	class="w-[336px] shadow rounded-md overflow-hidden"
>
	<div class="flex flex-col gap-3 px-4 py-5 bg-white sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">Add Event</h2>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}

		<input type="hidden" name="id" value={fields.id} />
		<input type="hidden" name="isDone" value={fields.isDone} />

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Name
				<input
					autocomplete="off"
					name="name"
					value={fields.name}
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</label>
		</div>

		<div>
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Description
				<textarea
					name="description"
					value={fields.description}
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
					value={fields.date}
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
						value={fields.startTime}
					/>
				</label>
			</div>

			<div class="col-span-2">
				<label class="block text-sm font-medium text-gray-700 mb-1">
					End time
					<input
						type="time"
						name="endTime"
						value={fields.endTime}
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</label>
			</div>
		</div>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if fields.id}
			<button
				class={classnames(
					'focus-visible:outline-red-600 bg-red-600 hover:bg-red-500',
					'inline-flex justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
				)}
				formaction="?/remove"
			>
				Delete
			</button>
		{:else}
			<div />
		{/if}

		<Button
			isLoading={submitting}
			className="focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500"
			type="submit"
		>
			Add
		</Button>
	</div>
</form>
