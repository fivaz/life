<script lang="ts">
	import { categories } from '$lib/category/store';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { ActionData, PageData } from './$types';
	import CategoryForm from './category-form/CategoryForm.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let showForm: boolean = false;
	export let form: ActionData | null = null;
	export let data: PageData;

	categories.set(data.categories);
</script>

<div class="flex flex-col gap-5">
	<div class="flex justify-end">
		<Button
			on:click={() => {
				showForm = true;
				form = null;
			}}
		>
			create category
		</Button>
	</div>

	<ul role="list" class="divide-y divide-gray-100">
		{#each $categories as category (category)}
			<CategoryRow
				{category}
				on:edit={(e) => {
					showForm = true;
					form = {
						saved: e.detail,
					};
				}}
			/>
		{/each}
	</ul>

	<Modal show={showForm} on:close={() => (showForm = false)}>
		<CategoryForm on:submit={() => (showForm = false)} {form} />
	</Modal>
</div>
