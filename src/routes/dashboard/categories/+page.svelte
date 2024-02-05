<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { Stores } from 'svelte/store';

	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { auth, db } from '$lib/firebase';
	import { derived } from 'svelte/store';
	import { collectionStore, userStore } from 'sveltefire';

	import CategoryForm from './category-form/CategoryForm.svelte';
	import { buildEmptyCategory } from './category-form/service';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let editingCategory: Category = buildEmptyCategory();

	let showForm = false;

	const user = userStore(auth);

	type CollectionStore<T> = {
		subscribe: (cb: (value: [] | T) => void) => (() => void) | void;
	};

	let categories: CollectionStore<Category[]>;
	if ($user) {
		const rawCategories = collectionStore<Category>(db, `users/${$user.uid}/categories`);

		categories = derived(rawCategories as Stores, (rawCategories) => {
			return rawCategories.map(({ ref, ...data }: Category & { ref: never }) => data);
		});
	}
</script>

{#if $user && $categories}
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

		<Modal on:close={() => (showForm = false)} show={showForm}>
			<CategoryForm
				category={editingCategory}
				on:close={() => (showForm = false)}
				userId={$user.uid}
			/>
		</Modal>
	</div>
{/if}
