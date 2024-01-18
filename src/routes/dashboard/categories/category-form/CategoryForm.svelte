<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import { removeCategory, updateCategory } from '$lib/category/store';
	import { groups, tailwindColors } from '$lib/category/utils';
	import type { CCategory } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import { createModal } from '$lib/components/dialog/service';
	import Input from '$lib/components/input/Input.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import { UnknownError } from '$lib/consts';
	import { closeModal } from '$lib/form-modal/store';
	import type { SubSubmitFunction } from '$lib/types-utils';
	import classnames from 'classnames';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/categories/$types';

	export let category: CCategory;

	$: isEditing = !!category.id;

	export let form: ActionData | null;

	let loading = false;

	let error = '';

	const DELETE_ACTION = '?/remove';
	const CREATE_ACTION = '?/create';
	const UPDATE_ACTION = '?/update';

	const handleDelete: SubSubmitFunction = async () => {
		const result = await createModal({ title: 'Are you sure?' });

		if (!result) {
			return () => {};
		}

		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && form?.removed) {
				removeCategory(form.removed);
			} else {
				console.log(form?.error || UnknownError);
			}
			closeModal();
			loading = false;
		};
	};

	const handleCreate: SubSubmitFunction = () => {
		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && form?.created) {
				updateCategory(form.created);
			} else {
				console.log(form?.error || UnknownError);
			}
			loading = false;
			closeModal();
		};
	};

	const handleEdit: SubSubmitFunction = async ({ formData }) => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && form?.updated) {
				updateCategory(form.updated);
			} else {
				console.log(form?.error || UnknownError);
			}
			loading = false;
			closeModal();
		};
	};

	export const submit: SubmitFunction = async ({ formData, action }) => {
		if (action.search === DELETE_ACTION) {
			return handleDelete({ formData });
		} else if (action.search === CREATE_ACTION) {
			return handleCreate({ formData });
		} else if (action.search === UPDATE_ACTION) {
			return handleEdit({ formData });
		}
	};
</script>

<form
	method="POST"
	action={isEditing ? UPDATE_ACTION : CREATE_ACTION}
	use:enhance={submit}
	class="w-[336px] shadow"
>
	<div class="flex flex-col gap-3 px-4 py-5 bg-white rounded-md sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">
			{#if isEditing}
				Edit Category
			{:else}
				Add Category
			{/if}
		</h2>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}

		<input type="hidden" name="id" value={category.id} />

		<Input
			label="Name"
			autocomplete="off"
			name="name"
			bind:value={category.name}
			class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
		/>

		<Select name="color" bind:value={category.color}>
			<div slot="placeholder" class="flex gap-5 items-center">
				<div class={classnames('h-5 w-5 rounded-md', tailwindColors[category.color].darkBg)} />
				{category.color}
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

		<Select name="group" bind:value={category.group}>
			<div slot="placeholder" class="flex gap-5 items-center">{category.group}</div>

			{#each groups as group (group)}
				<SelectItem value={group} class="flex gap-5 items-center">{group}</SelectItem>
			{/each}
		</Select>

		<!--		TODO Add a toggle-->
		<label>
			<input
				name="isDefault"
				type="checkbox"
				bind:checked={category.isDefault}
				class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
			/>
			default
		</label>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 rounded-md text-right sm:px-6">
		{#if isEditing}
			<Button disabled={loading} formaction="?/remove" color="red">Delete</Button>
		{:else}
			<div />
		{/if}

		<Button disabled={loading} type="submit">
			{#if isEditing} Edit {:else} Add {/if}
		</Button>
	</div>

	<Loading {loading} class="h-8 w-8 text-indigo-500" />
</form>
