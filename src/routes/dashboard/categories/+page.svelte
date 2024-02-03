<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import type { OptionalId } from '$lib/form-utils';
	import { SignedIn } from 'sveltefire';
	import CategoryForm from './category-form/CategoryForm.svelte';
	import { buildEmptyCategory } from './category-form/service';
	import CategoryRow from './category-row/CategoryRow.svelte';
	import { parseCategories } from './service';

	let editingCategory: OptionalId<Category> = buildEmptyCategory();

	let showForm = false;
</script>

<SignedIn let:user>
	<SlimCollection
		ref={`users/${user.uid}/categories`}
		parse={parseCategories}
		let:data={categories}
	>
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
				{#each categories as thisCategory (thisCategory)}
					<CategoryRow
						category={thisCategory}
						on:edit={(e) => {
							showForm = true;
							editingCategory = e.detail;
						}}
					/>
				{/each}
			</ul>

			<Modal show={showForm} on:close={() => (showForm = false)}>
				<CategoryForm
					userId={user.uid}
					category={editingCategory}
					on:close={() => (showForm = false)}
				/>
			</Modal>
		</div>
	</SlimCollection>
</SignedIn>
