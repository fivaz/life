<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import { collectionStore, SignedIn, userStore } from 'sveltefire';
	import CategoryForm from './category-form/CategoryForm.svelte';
	import { buildEmptyCategory } from './category-form/service';
	import CategoryRow from './category-row/CategoryRow.svelte';
	import { parseCategories } from './service';
	import { auth, db } from '$lib/firebase';
	import { collection, CollectionReference, Query } from 'firebase/firestore';
	import type { Stores, Writable } from 'svelte/store';
	import { Loader2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { derived } from 'svelte/store';

	let editingCategory: Category = buildEmptyCategory();

	let showForm = false;

	const user = userStore(auth);

	type CollectionStore<T> = {
		subscribe: (cb: (value: T | []) => void) => void | (() => void);
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

		<Modal show={showForm} on:close={() => (showForm = false)}>
			<CategoryForm
				userId={$user.uid}
				category={editingCategory}
				on:close={() => (showForm = false)}
			/>
		</Modal>
	</div>
{/if}
