<script lang="ts">
	import { type Category, categoryTypes } from '$lib/category/category.model';
	import { addCategory, deleteCategory, editCategory } from '$lib/category/category.respository';
	import { tailwindColorMap, tailwindColors } from '$lib/category/category.utils';
	import CloseX from '$lib/components/close-x/CloseX.svelte';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';

	import { checkErrors } from './service';

	interface Props {
		userId: string;
		category: Category;
		close: () => void;
	}

	let { userId, category, close }: Props = $props();

	let isEditing = $derived(!!category.id);

	let errorMessage = $state('');

	let categoryIn = $state({ ...category });

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

<form class="relative w-[355px] text-sm font-medium shadow" onsubmit={onSubmit}>
	<div class="rounded-t-md bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex items-center justify-between pb-2">
			<h2 class="text-lg font-medium text-gray-900">
				{isEditing ? 'Edit Category' : 'Add Category'}
			</h2>

			<CloseX {close} />
		</div>

		<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
			{errorMessage}
		</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			<Input autocomplete="off" class="flex-1" placeholder="Name" bind:value={categoryIn.name} />

			{#snippet categoryItem(color: Category['color'])}
				<div class="flex items-center gap-3">
					<div class="h-5 w-5 rounded-md {tailwindColorMap[color].darkBg}"></div>
					{color}
				</div>
			{/snippet}

			<Select
				bind:value={categoryIn.color}
				class="flex items-center"
				label="Category"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				{#snippet placeholder()}
					{@render categoryItem(categoryIn.color)}
				{/snippet}

				{#each tailwindColors as color (color)}
					<SelectItem value={color}>{@render categoryItem(color)}</SelectItem>
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

				{#each Object.values(categoryTypes) as categoryType (categoryType)}
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

	<div class="flex justify-between rounded-b-md bg-gray-50 px-4 py-3 text-right sm:px-6">
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
