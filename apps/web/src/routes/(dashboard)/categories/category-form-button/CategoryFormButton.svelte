<script lang="ts">
	import { Button, LInput, ModalForm } from '@life/shared';
	import type { Category } from '@life/shared/category';
	import { tailwindColorMap, tailwindColors } from '@life/shared/category';
	import { Plus } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	import { buildEmptyCategory } from '$lib/category/category.model';
	import { addCategory, deleteCategory, editCategory } from '$lib/category/category.respository';
	import { categories } from '$lib/category/category.svelte';
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

	let otherCategories = $derived(categories.value.filter((cat) => cat.id !== category.id));

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

{#snippet colorItem(color: Category['color'])}
	<div class="flex items-center gap-3">
		<div class="size-5 rounded-md {tailwindColorMap[color].darkBg}"></div>
		{color}
	</div>
{/snippet}

{#snippet categoryItem(category: Category)}
	<div class="flex items-center gap-3">
		<div class="{tailwindColorMap[category.color]?.darkBg} size-5 rounded-md"></div>
		<div class="w-[calc(100%-32px)] truncate">{category.name}</div>
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
		label="Color"
		labelClass="w-1/5"
		selectClass="flex-1"
		bind:value={categoryIn.color}
	>
		{#snippet placeholder()}
			{@render colorItem(categoryIn.color)}
		{/snippet}

		{#each tailwindColors as color (color)}
			<SelectItem value={color}>{@render colorItem(color)}</SelectItem>
		{/each}
	</Select>

	<Select
		class="flex items-center"
		label="Parent"
		labelClass="w-1/5"
		selectClass="flex-1"
		bind:value={categoryIn.parent}
	>
		{#snippet placeholder()}
			{#if categoryIn.parent}
				{@render categoryItem(categoryIn.parent)}
			{:else}
				<div>No Parent</div>
			{/if}
		{/snippet}

		{#each otherCategories as category (category.id)}
			<SelectItem class="flex items-center gap-5" value={category}>
				{@render categoryItem(category)}
			</SelectItem>
		{/each}
	</Select>
</ModalForm>
