<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import Button2 from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import { title } from '$lib/utils';
	import AuthGuard from '$lib/components/auth-guard/AuthGuard.svelte';

	import CategoryForm from './category-form/CategoryForm.svelte';
	import { buildEmptyCategory } from './category-form/service';
	import CategoryRow from './category-row/CategoryRow.svelte';
	import { Plus } from 'lucide-svelte';

	let editingCategory: Category = $state(buildEmptyCategory());

	let isFormOpen = $state(false);

	let categoryType: Category;

	title.set('Categories');
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{$title}</h1>
		<span></span>
		<Button2
			onclick={() => {
				isFormOpen = true;
				editingCategory = buildEmptyCategory();
			}}
		>
			<Plus class="h-4 w-auto" />
			New Category
		</Button2>
	</div>

	<AuthGuard>
		{#snippet data(user)}
			<TypedCollection
				ref={`${DB_PATH.USERS}/${user.uid}/${DB_PATH.CATEGORIES}`}
				type={categoryType}
			>
				{#snippet data(categories)}
					<ul class="flex flex-col gap-1">
						{#each categories as category (category)}
							<CategoryRow
								{category}
								edit={(category) => {
									isFormOpen = true;
									editingCategory = category;
								}}
							/>
						{/each}
					</ul>

					<Modal close={() => (isFormOpen = false)} isOpen={isFormOpen}>
						<CategoryForm
							category={editingCategory}
							close={() => (isFormOpen = false)}
							userId={user.uid}
						/>
					</Modal>
				{/snippet}
			</TypedCollection>
		{/snippet}
	</AuthGuard>
</div>
