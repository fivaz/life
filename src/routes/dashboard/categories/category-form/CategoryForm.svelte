<script lang="ts">
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import { removeCategory, updateCategory } from '$lib/category/store';
	import { groups, tailwindColors } from '$lib/category/utils';
	import type { CCategory } from '$lib/category/utils';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { createModal } from '$lib/components/dialog/service';
	import Input from '$lib/components/input/Input.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
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

	const handleDelete: SubSubmitFunction<CCategory, ActionData> = async ({ form }) => {
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

	const handleCreate: SubSubmitFunction<CCategory, ActionData> = ({ form }) => {
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

	const handleEdit: SubSubmitFunction<CCategory, ActionData> = async ({ form }) => {
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
			return handleDelete({ formData, data: category, form });
		} else if (action.search === CREATE_ACTION) {
			return handleCreate({ formData, data: category, form });
		} else if (action.search === UPDATE_ACTION) {
			return handleEdit({ formData, data: category, form });
		}
	};
</script>

<form
	method="POST"
	action={isEditing ? UPDATE_ACTION : CREATE_ACTION}
	use:enhance={submit}
	class="w-[355px] shadow rounded-md"
>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex justify-between items-center pb-2">
			<h2 class="text-lg font-medium text-gray-900">
				{#if isEditing}
					Edit Category
				{:else}
					Add Category
				{/if}
			</h2>
			<button
				type="button"
				class="pl-2 inline-flex rounded-md p-1.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
				on:click={() => closeModal()}
			>
				<span class="sr-only">Dismiss</span>
				<Icon src={XMark} class="h-5 w-5" aria-hidden="true" />
			</button>
		</div>

		<Alert type="error" isVisible={!!error} hasCloseButton={false}>{error}</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			<input type="hidden" name="id" value={category.id} />

			<Input
				class="flex-1"
				inputClass=""
				placeholder="Name"
				autocomplete="off"
				name="name"
				bind:value={category.name}
			/>

			<Select
				name="color"
				bind:value={category.color}
				label="Category"
				class="flex items-center"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
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

			<Select
				name="group"
				bind:value={category.group}
				label="Group"
				class="flex items-center"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				<div slot="placeholder" class="flex gap-5 items-center">{category.group}</div>

				{#each groups as group (group)}
					<SelectItem value={group} class="flex gap-5 items-center">{group}</SelectItem>
				{/each}
			</Select>

			<div class="bg-white rounded-lg p-2">
				<Toggle label="Is default" name="isDefault" bind:value={category.isDefault} />
			</div>
		</div>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
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
