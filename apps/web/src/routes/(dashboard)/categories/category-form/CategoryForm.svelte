<script lang="ts">
	import { ModalForm } from '@life/shared';
	import { categoryTypes, tailwindColorMap, tailwindColors } from '@life/shared/category';

	import type { Category } from '$lib/category/category.model';
	import { addCategory, deleteCategory, editCategory } from '$lib/category/category.respository';
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

<ModalForm
	name="Category"
	{close}
	{errorMessage}
	isEditing={!!category.id}
	onDelete={() => deleteCategory(category.id, currentUser.uid, close)}
	{onSubmit}
>
	<div class="flex flex-col gap-2 text-sm font-medium">
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
</ModalForm>
