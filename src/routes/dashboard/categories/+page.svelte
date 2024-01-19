<script lang="ts">
	import { categories } from '$lib/category/store';
	import { groups, tailwindColors } from '$lib/category/utils';
	import type { CCategory } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { closeModal, isModalVisible, openModal } from '$lib/form-modal/store';
	import type { ActionData, PageData } from './$types';
	import CategoryForm from './category-form/CategoryForm.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	export let form: ActionData | null = null;

	export let data: PageData;

	let editingCategory = buildEmptyCategory();

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
				openModal();
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
					openModal();
					editingCategory = e.detail;
				}}
			/>
		{/each}
	</ul>

	<Modal show={$isModalVisible} on:close={() => closeModal()}>
		<CategoryForm {form} category={editingCategory} />
	</Modal>
</div>
