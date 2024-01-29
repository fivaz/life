<script lang="ts">
	import { categories } from '$lib/category/store';
	import { groups, tailwindColors } from '$lib/category/utils';
	import type { CCategory } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import type { PageData } from './$types';
	import CategoryForm from './category-form/CategoryForm.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	export let data: PageData;

	let editingCategory = buildEmptyCategory();

	let showForm = false;

	function buildEmptyCategory(): CCategory {
		return {
			id: 0,
			name: '',
			isDefault: false,
			color: Object.keys(tailwindColors)[0],
			group: groups[0],
		};
	}

	categories.set(data.categories);
</script>

<div class="flex flex-col gap-5">
	<div class="flex justify-end">
		<Button
			on:click={() => {
				showForm = true;
				editingCategory = buildEmptyCategory();
			}}
		>
			Create Category
		</Button>
	</div>

	<ul role="list" class="divide-y divide-gray-100">
		{#each $categories as thisCategory (thisCategory)}
			<CategoryRow
				category={thisCategory}
				on:edit={(e) => {
					showForm = true;
					editingCategory = e.detail;
				}}
			/>
		{/each}
	</ul>

	<CategoryForm show={showForm} category={editingCategory} on:close={() => (showForm = false)} />
</div>
