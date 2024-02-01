<script lang="ts">
	import { types, tailwindColors } from '$lib/category/utils';
	import type { Category } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import { auth, db } from '$lib/firebase';
	import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
	import type { Unsubscribe } from 'firebase/firestore';
	import { onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { Collection, collectionStore, SignedIn, userStore } from 'sveltefire';
	import type { PageData } from './$types';
	import CategoryForm from './category-form/CategoryForm.svelte';
	import { buildEmptyCategory } from './category-form/service';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let editingCategory = buildEmptyCategory();

	let showForm = false;

	function parseCategories(categoriesCollection: Array<Record<string, any>>) {
		return categoriesCollection.map((datum: any) => ({
			id: datum.id,
			name: datum.name,
			color: datum.color,
			type: datum.type,
			isDefault: datum.isDefault,
		}));
	}
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
