<script lang="ts">
	import { enhance } from '$app/forms';

	import Input from '$lib/components/input/Input.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/category/$types';

	let loading = false;
	export let form: ActionData | null;

	let error = '';

	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	action="?/save"
	use:enhance={() => {
		dispatch('submit');
	}}
	class="w-[336px] shadow rounded-md overflow-hidden"
>
	<div class="flex flex-col gap-3 px-4 py-5 bg-white sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">
			{#if form?.saved?.id}
				Edit Category
			{:else}
				Add Category
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

		<label>
			<input
				name="isDefault"
				type="checkbox"
				checked={form?.saved?.isDefault || false}
				class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
			/>
			default
		</label>

		<div class="flex justify-end px-4 py-3 bg-gray-50 text-right sm:px-6">
			<button type="submit">
				{#if form?.saved?.id} Edit {:else} Add {/if}
			</button>
		</div>
	</div>
</form>
