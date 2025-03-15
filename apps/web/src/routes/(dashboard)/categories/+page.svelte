<script lang="ts">
	import { Button, LText, Modal } from '@life/shared';
	import { Plus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { dragHandleZone } from 'svelte-dnd-action';

	import type { Category } from '$lib/category/category.model';
	import { buildEmptyCategory } from '$lib/category/category.model';
	import { fetchCategories, updateCategoriesOrder } from '$lib/category/category.respository';
	import { currentUser } from '$lib/user/user.utils.svelte';
	import { title } from '$lib/utils.svelte';

	import CategoryForm from './category-form/CategoryForm.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let newCategory = $state<Category>(buildEmptyCategory());

	title.value = 'Categories';

	let categories = $state<Category[]>([]);

	fetchCategories(categories);

	const flipDuration = 200;

	function handleConsider({ detail }: { detail: { items: Category[] } }) {
		categories.splice(0, categories.length, ...detail.items);
	}

	function handleFinalize({ detail }: { detail: { items: Category[] } }) {
		const orderedCategories = detail.items.map((category, index) => {
			category.order = index;
			return category;
		});

		categories.splice(0, categories.length, ...orderedCategories);

		updateCategoriesOrder(categories, currentUser.uid);
	}
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<LText class="hidden text-2xl font-bold md:block">{title.value}</LText>
		<span></span>
		<!--this empty span makes CategoryForm always in the right side on mobile-->

		<CategoryForm category={newCategory} />
	</div>

	<ul
		class="flex flex-col gap-1"
		onconsider={handleConsider}
		onfinalize={handleFinalize}
		use:dragHandleZone={{ flipDurationMs: flipDuration, items: categories }}
	>
		{#each categories as category (category.id)}
			<div animate:flip={{ duration: flipDuration }}>
				<CategoryRow {category} />
			</div>
		{/each}
	</ul>
</div>
