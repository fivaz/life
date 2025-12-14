<script lang="ts">
	import { Button, LInput, ModalForm } from '@life/shared';
	import { categoryTypes, tailwindColorMap, tailwindColors } from '@life/shared/category';
	import { Plus } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	import type { Category } from '$lib/category/category.model';
	import { buildEmptyCategory } from '$lib/category/category.model';
	import { addCategory, deleteCategory, editCategory } from '$lib/category/category.respository';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import { checkErrors } from './service';

	interface Props {
		category: Category;
		children?: Snippet;
		color?: 'indigo' | 'red' | 'white' | 'none';
		class?: string;
		padding?: string;
	}

	let { category, children, color, class: klass, padding }: Props = $props();

	let isOpen = $state(false);

	let errorMessage = $state('');

	let categoryIn = $state(buildEmptyCategory());

	function close() {
		isOpen = false;
	}

	function open() {
		if (category.id) console.log(category.id);
		categoryIn = { ...category };
		isOpen = true;
	}

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

<Button class={klass} {color} onclick={open} {padding}>
	{#if children}
		{@render children()}
	{:else}
		<Plus class="size-4" />
		New Category
	{/if}
</Button>

{#snippet categoryItem(color: Category['color'])}
	<div class="flex items-center gap-3">
		<div class="size-5 rounded-md {tailwindColorMap[color].darkBg}"></div>
		{color}
	</div>
{/snippet}

<ModalForm
	name="Category"
	{close}
	{errorMessage}
	isEditing={!!category.id}
	onDelete={() => deleteCategory(category.id, currentUser.uid, close)}
	{onSubmit}
	bind:isOpen
>
	<LInput
		class="flex-1"
		autocomplete="off"
		autofocus
		inputClass="w-full"
		placeholder="Name"
		bind:value={categoryIn.name}
	/>

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
</ModalForm>
