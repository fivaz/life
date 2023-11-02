<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import { removeCategory, updateCategory } from '$lib/category/store';
	import { groups, tailwindColors } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/category/$types';

	let loading = false;
	export let form: ActionData | null;
	let error = '';

	const dispatch = createEventDispatcher();

	let selectedColor = form?.saved?.color || Object.keys(tailwindColors)[0];

	let selectedGroup = form?.saved?.group || groups[0];

	const submit: SubmitFunction = () => {
		try {
			loading = true;

			return async ({ result }) => {
				await applyAction(result);
				if (result.type === 'success') {
					if (form?.removed) {
						removeCategory(form.removed);
					} else if (form?.saved) {
						updateCategory(form.saved);
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

		<Select name="color" bind:value={selectedColor}>
			<div slot="placeholder" class="flex gap-5 items-center">
				<div class={classnames('h-5 w-5 rounded-md', tailwindColors[selectedColor].darkBg)} />
				{selectedColor}
			</div>

			{#each Object.keys(tailwindColors) as color (color)}
				<SelectItem value={color}>
					<div class="flex gap-5 items-center">
						<div class={classnames('h-5 w-5 rounded-md', tailwindColors[color].darkBg)} />
						{color}
					</div>
				</SelectItem>
			{/each}
		</Select>

		<Select name="group" bind:value={selectedGroup}>
			<div slot="placeholder" class="flex gap-5 items-center">{selectedGroup}</div>

			{#each groups as group (group)}
				<SelectItem value={group} class="flex gap-5 items-center">{group}</SelectItem>
			{/each}
		</Select>

		<!--		Add a toggle-->
		<label>
			<input
				name="isDefault"
				type="checkbox"
				checked={form?.saved?.isDefault || false}
				class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
			/>
			default
		</label>
	</div>

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
</form>
