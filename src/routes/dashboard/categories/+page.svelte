<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import Button2 from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { title } from '$lib/utils.svelte';

	import CategoryForm from './category-form/CategoryForm.svelte';
	import { buildEmptyCategory } from './category-form/service';
	import CategoryRow from './category-row/CategoryRow.svelte';
	import { Plus } from 'lucide-svelte';
	import DBCategories from '$lib/components/db-categories/DBCategories.svelte';

	let editingCategory: Category = $state(buildEmptyCategory());

	let isFormOpen = $state(false);
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<DBCategories>
		{#snippet data(userId, categories)}
			<div class="flex items-center justify-between">
				<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
				<span></span>
				<Button2
					onclick={() => {
						isFormOpen = true;
						editingCategory = buildEmptyCategory();
					}}
				>
					<Plus class="h-4 w-auto" />
					New Category
				</Button2>
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

			<Modal close={() => (isFormOpen = false)} isOpen={isFormOpen}>
				<CategoryForm category={editingCategory} close={() => (isFormOpen = false)} {userId} />
			</Modal>
		{/snippet}
	</DBCategories>
</div>
