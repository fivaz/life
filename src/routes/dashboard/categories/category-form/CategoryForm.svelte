<script lang="ts">
	import { type Category, CategoryTypes } from '$lib/category/utils';
	import { tailwindColors } from '$lib/category/utils';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import Button from '$lib/components/form/button2/Button2.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button2/ConfirmButton.svelte';
	import Input from '$lib/components/form/input2/Input.svelte';
	import Select from '$lib/components/form/select2/Select.svelte';
	import SelectItem from '$lib/components/form/select2/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/form/toggle2/Toggle.svelte';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { addCategory, deleteCategory, editCategory } from './service';

	interface Props {
		userId: string;
		category: Category;
		close: () => void;
	}

	let { userId, category, close }: Props = $props();

	let isEditing = $derived(!!category.id);

	let errorMessage = $state('');

	let categoryIn = $state({ ...category });

	function checkErrors(category: Category): string {
		if (!category.name) {
			return 'name is required';
		}

		return '';
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = checkErrors(categoryIn);
		if (errorMessage) {
			return;
		}

		const { id, ...data } = categoryIn;

		if (id) {
			editCategory(id, data, userId);
		} else {
			addCategory(data, userId);
		}
		close();
	}
</script>

<form class="relative w-[355px] rounded-md text-sm font-medium shadow" onsubmit={onSubmit}>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex items-center justify-between pb-2">
			<h2 class="text-lg font-medium text-gray-900">
				{isEditing ? 'Edit Category' : 'Add Category'}
			</h2>
			<button
				class="inline-flex rounded-md p-1.5 pl-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
				onclick={close}
				type="button"
			>
				<span class="sr-only">Dismiss</span>
				<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
			</button>
		</div>

		<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
			{errorMessage}
		</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			<Input autocomplete="off" class="flex-1" placeholder="Name" bind:value={categoryIn.name} />

			<Select
				bind:value={categoryIn.color}
				class="flex items-center"
				label="Category"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				{#snippet placeholder()}
					<div class="flex items-center gap-3">
						<div class="h-5 w-5 rounded-md {tailwindColors[categoryIn?.color]?.darkBg}"></div>
						{categoryIn.color}
					</div>
				{/snippet}

				{#each Object.keys(tailwindColors) as color (color)}
					<SelectItem value={color}>
						<div class="flex items-center gap-3">
							<div class="h-5 w-5 rounded-md {tailwindColors[color]?.darkBg}"></div>
							{color}
						</div>
					</SelectItem>
				{/each}
			</Select>

			<Select
				bind:value={categoryIn.type}
				class="flex items-center"
				label="Type"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				{#snippet placeholder()}
					<div class="flex items-center gap-5">{categoryIn.type}</div>
				{/snippet}

				{#each Object.values(CategoryTypes) as categoryType (categoryType)}
					<SelectItem class="flex items-center gap-5" value={categoryType}>
						{categoryType}
					</SelectItem>
				{/each}
			</Select>

			<div class="rounded-lg bg-white p-2">
				<Toggle bind:value={categoryIn.isDefault} label="default" />
			</div>
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				confirm={() => deleteCategory(category.id, userId, close)}
				type="button"
				confirmByKey="Delete"
			>
				Delete
			</ConfirmButton>
		{:else}
			<div></div>
		{/if}

		<Button type="submit">
			{#if isEditing}
				Edit
			{:else}
				Add
			{/if}
		</Button>
	</div>
</form>
