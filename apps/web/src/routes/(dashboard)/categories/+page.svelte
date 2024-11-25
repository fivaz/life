<script lang="ts">
	import { Button } from '@life/shared/components';
	import { Plus } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import { buildEmptyCategory } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { title } from '$lib/date.utils.svelte';

	import CategoryForm from './category-form/CategoryForm.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let editingCategory = $state<Category>(buildEmptyCategory());

	let isFormOpen = $state<boolean>(false);

	title.value = 'Categories';

	function openForm(category = buildEmptyCategory()) {
		isFormOpen = true;
		editingCategory = category;
	}

	let categories = $state<Category[]>([]);

	fetchCategories(categories);
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
		<span></span>
		<Button onclick={() => openForm()}>
			<Plus class="h-4 w-auto" />
			New Category
		</Button>
	</div>

	<ul class="flex flex-col gap-1">
		{#each categories as category (category.id)}
			<CategoryRow {category} edit={openForm} />
		{/each}
	</ul>

	<Modal bind:isOpen={isFormOpen}>
		<CategoryForm category={editingCategory} close={() => (isFormOpen = false)} />
	</Modal>
</div>
