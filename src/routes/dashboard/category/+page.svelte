<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { ActionData, PageData } from './$types';
	import CategoryForm from './category-form/CategoryForm.svelte';
	import CategoryRow from './category-row/CategoryRow.svelte';

	let showForm: boolean = false;
	export let form: ActionData | null = null;
	export let data: PageData;
</script>

<Button
	on:click={() => {
		showForm = true;
		form = null;
	}}
>
	create category
</Button>

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
			on:remove={() => console.log('remove')}
		/>
	{/each}
</ul>

<Modal show={showForm} on:close={() => (showForm = false)}>
	<CategoryForm on:submit={() => (showForm = false)} {form} />
</Modal>
