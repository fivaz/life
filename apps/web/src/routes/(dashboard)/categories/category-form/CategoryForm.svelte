<script lang="ts">
	import { Button } from '@life/shared';
	import { categoryTypes, tailwindColorMap, tailwindColors } from '@life/shared/category';

	import type { Category } from '$lib/category/category.model';
	import { addCategory, deleteCategory, editCategory } from '$lib/category/category.respository';
	import CloseX from '$lib/components/close-x/CloseX.svelte';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import { checkErrors } from './service';

	interface Props {
		category: Category;
		close: () => void;
	}

	let { category, close }: Props = $props();

	let isEditing = $derived(!!category.id);

	let errorMessage = $state('');

	let categoryIn = $state({ ...category });

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = checkErrors(categoryIn);
		if (errorMessage) {
			return;
		}

		if (categoryIn.id) {
			editCategory(categoryIn, currentUser.uid);
		} else {
			addCategory(categoryIn, currentUser.uid);
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
			<Input
				class="flex-1"
				autocomplete="off"
				inputClass="w-full"
				placeholder="Name"
				bind:value={categoryIn.name}
			/>

			{#snippet categoryItem(color: Category['color'])}
				<div class="flex items-center gap-3">
					<div class="h-5 w-5 rounded-md {tailwindColorMap[color].darkBg}"></div>
					{color}
				</div>
			{/snippet}

			<Select
				class="flex items-center"
				label="Category"
				labelClass="w-1/5"
				selectClass="flex-1"
				bind:value={categoryIn.color}
			>
				{#snippet placeholder()}
					{@render categoryItem(categoryIn.color)}
				{/snippet}

				{#each tailwindColors as color (color)}
					<SelectItem value={color}>{@render categoryItem(color)}</SelectItem>
				{/each}
			</Select>

			<Select
				class="flex items-center"
				label="Type"
				labelClass="w-1/5"
				selectClass="flex-1"
				bind:value={categoryIn.type}
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
		</div>
	</div>

	<div class="flex justify-between rounded-b-md bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				confirm={() => deleteCategory(category.id, currentUser.uid, close)}
				confirmByKey="Delete"
				type="button"
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
