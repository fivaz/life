<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import { removeToDo, updateToDo } from '$lib/to-do/store';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/to-do/$types';

	let loading = false;
	export let form: ActionData | null;
	let error = '';

	const dispatch = createEventDispatcher();

	const submit: SubmitFunction = () => {
		try {
			loading = true;

			return async ({ result }) => {
				await applyAction(result);
				if (result.type === 'success') {
					if (form?.removed) {
						removeToDo(form.removed);
					} else if (form?.saved) {
						updateToDo(form.saved);
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
			if (e instanceof Error) {
				error = e.message;
			}
			loading = false;
		}
	};
</script>

<form method="POST" action="?/save" use:enhance={submit} class="w-[336px] shadow">
	<div class="flex flex-col gap-3 px-4 py-5 bg-white rounded-md sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">
			{#if form?.saved?.id}
				Edit To Do
			{:else}
				Add To Do
			{/if}
		</h2>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}

		<input type="hidden" name="id" value={form?.saved?.id || ''} />

		<Input
			label="Name"
			autocomplete="off"
			name="name"
			value={form?.saved?.name || ''}
			class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		/>

		<div class="flex justify-between px-4 py-3 bg-gray-50 rounded-md text-right sm:px-6">
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
	</div>
</form>
