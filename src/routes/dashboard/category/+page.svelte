<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { ActionData, PageData } from './$types';
	import CategoryForm from './category-form/CategoryForm.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let showForm: boolean = false;
	export let form: ActionData | null = null;
	export let data: PageData;
</script>

<button
	on:click={() => {
		showForm = true;
		form = null;
	}}
>
	create category
</button>

<ul role="list" class="divide-y divide-gray-100">
	{#each data.categories as category (category)}
		<CategoryRow
			{category}
			on:edit={(e) => {
				showForm = true;
				form = {
					saved: e.detail
				};
			}}
		/>
	{/each}
</ul>

<Modal show={showForm} on:close={() => (showForm = false)}>
	<CategoryForm on:submit={() => (showForm = false)} {form} />
</Modal>
