<script lang="ts">
	import { categories } from '$lib/category/store';
	import { groups, tailwindColors } from '$lib/category/utils';
	import type { CCategory } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { ActionData, PageData } from './$types';
	import CategoryForm from './category-form/CategoryForm.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	export let form: ActionData | null = null;

	export let data: PageData;

	let showForm = false;

	let category = buildEmptyCategory();

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
				category = buildEmptyCategory();
			}}
		>
			create category
		</Button>
	</div>

	<ul role="list" class="divide-y divide-gray-100">
		{#each $categories as thisCategory (thisCategory)}
			<CategoryRow
				category={thisCategory}
				on:edit={(e) => {
					showForm = true;
					category = e.detail;
				}}
			/>
		{/each}
	</ul>

	<Modal show={showForm} on:close={() => (showForm = false)}>
		<CategoryForm on:submit={() => (showForm = false)} {form} {category} />
	</Modal>
</div>
