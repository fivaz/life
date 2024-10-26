<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import Button2 from '$lib/components/form/button2/Button2.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TypedCollection from '$lib/components/typed-collection2/TypedCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import { title } from '$lib/utils';
	import { SignedIn } from 'sveltefire';

	import CategoryForm from './category-form/CategoryForm.svelte';
	import { buildEmptyCategory } from './category-form/service';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let editingCategory: Category = $state(buildEmptyCategory());

	let showForm = $state(false);

	let categoryType: Category;

	title.set('Categories');
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{$title}</h1>
		<span></span>
		<!--		TODO add Icon Plus back in the button-->
		<!--		<Plus class="h-4 w-auto" />-->
		<Button2
			onclick={() => {
				showForm = true;
				editingCategory = buildEmptyCategory();
			}}
		>
			New Category
		</Button2>
	</div>

	<SignedIn let:user>
		<TypedCollection ref={`${DB_PATH.USERS}/${user.uid}/${DB_PATH.CATEGORIES}`} type={categoryType}>
			{#snippet data(categories)}
				<ul class="flex flex-col gap-1">
					{#each categories as category (category)}
						<CategoryRow
							{category}
							edit={(category) => {
								showForm = true;
								editingCategory = category;
							}}
						/>
					{/each}
				</ul>

				<Modal on:close={() => (showForm = false)} show={showForm}>
					<CategoryForm
						category={editingCategory}
						close={() => (showForm = false)}
						userId={user.uid}
					/>
				</Modal>
			{/snippet}
		</TypedCollection>
	</SignedIn>
</div>
