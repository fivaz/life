<script lang="ts">
	import { LText } from '@life/shared';
	import { flip } from 'svelte/animate';
	import { dragHandleZone } from 'svelte-dnd-action';

	import type { Category } from '$lib/category/category.model';
	import { buildEmptyCategory } from '$lib/category/category.model';
	import { updateCategoriesOrder } from '$lib/category/category.respository';
	import { categoriesStore } from '$lib/category/category.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';
	import { title } from '$lib/utils.svelte';

	import CategoryFormButton from './category-form-button/CategoryFormButton.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let newCategory = $state<Category>(buildEmptyCategory());

	title.value = 'Categories';

	const flipDuration = 200;

	function handleConsider({ detail }: { detail: { items: Category[] } }) {
		categoriesStore.value = detail.items;
	}

	function handleFinalize({ detail }: { detail: { items: Category[] } }) {
		categoriesStore.value = detail.items.map((category, index) => {
			category.order = index;
			return category;
		});

		updateCategoriesOrder(categoriesStore.value, currentUser.uid);
	}
</script>

<div class="mx-auto flex min-h-screen max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<LText class="hidden text-2xl font-bold md:block">{title.value}</LText>
		<span></span>
		<!--this empty span makes CategoryFormButton always in the right side on mobile-->

		<CategoryFormButton category={newCategory} />
	</div>

	<ul
		class="flex flex-col gap-1"
		onconsider={handleConsider}
		onfinalize={handleFinalize}
		use:dragHandleZone={{ flipDurationMs: flipDuration, items: categoriesStore.value }}
	>
		{#each categoriesStore.value as category (category.id)}
			<div animate:flip={{ duration: flipDuration }}>
				<CategoryRow {category} />
			</div>
		{/each}
	</ul>
</div>
