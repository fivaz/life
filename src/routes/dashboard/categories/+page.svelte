<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { SignedIn } from 'sveltefire';

	import CategoryForm from './category-form/CategoryForm.svelte';
	import { buildEmptyCategory } from './category-form/service';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let editingCategory: Category = buildEmptyCategory();

	let showForm = false;

	let categoryType: Category;
</script>

<SignedIn let:user>
	<TypedCollection let:data={categories} ref={`users/${user.uid}/categories`} type={categoryType}>
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

			<ul class="divide-y divide-gray-100" role="list">
				{#each categories as category (category)}
					<CategoryRow
						{category}
						on:edit={(e) => {
							showForm = true;
							editingCategory = e.detail;
						}}
					/>
				{/each}
			</ul>

			<Modal on:close={() => (showForm = false)} show={showForm}>
				<CategoryForm
					category={editingCategory}
					on:close={() => (showForm = false)}
					userId={user.uid}
				/>
			</Modal>
		</div>
	</TypedCollection>
</SignedIn>
