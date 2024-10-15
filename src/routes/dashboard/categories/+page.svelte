<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DbPaTH } from '$lib/consts';
	import { title } from '$lib/utils/store';
	import { Plus } from 'lucide-svelte';
	import { SignedIn } from 'sveltefire';

	import CategoryForm from './category-form/CategoryForm.svelte';
	import { buildEmptyCategory } from './category-form/service';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let editingCategory: Category = buildEmptyCategory();

	let showForm = false;

	let categoryType: Category;

	title.set('Categories');
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SignedIn let:user>
			<TypedCollection
				let:data={categories}
				ref={`${DbPaTH.USERS}/${user.uid}/${DbPaTH.CATEGORIES}`}
				type={categoryType}
			>
				<div class="flex flex-col gap-5">
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

					<button
						class="fixed bottom-4 right-4 flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						on:click={() => {
							showForm = true;
							editingCategory = buildEmptyCategory();
						}}
					>
						<Plus class="h-4 w-4" />
						<span>Create Category</span>
					</button>

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
	</div>
</div>
