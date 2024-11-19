<script lang="ts">
	import { Plus } from 'lucide-svelte';

	import { buildEmptyCategory, type Category } from '$lib/category/category.model';
	import DBCategories from '$lib/category/DBCategories.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { title } from '$lib/date.utils.svelte.js';

	import CategoryForm from './category-form/CategoryForm.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let editingCategory = $state<Category>(buildEmptyCategory());

	let isFormOpen = $state<boolean>(false);

	title.value = 'Categories';
</script>

<DBCategories>
	{#snippet data(categories, userId)}
		<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
				<span></span>
				<Button
					onclick={() => {
						isFormOpen = true;
						editingCategory = buildEmptyCategory();
					}}
				>
					<Plus class="h-4 w-auto" />
					New Category
				</Button>
			</div>

			<ul class="flex flex-col gap-1">
				{#each categories as category (category)}
					<CategoryRow
						{category}
						edit={(category) => {
							isFormOpen = true;
							editingCategory = category;
						}}
					/>
				{/each}
			</ul>

			<Modal bind:isOpen={isFormOpen}>
				<CategoryForm category={editingCategory} close={() => (isFormOpen = false)} {userId} />
			</Modal>
		</div>
	{/snippet}
</DBCategories>
