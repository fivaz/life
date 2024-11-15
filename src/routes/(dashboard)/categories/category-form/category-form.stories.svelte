<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CategoryForm from './CategoryForm.svelte';

	const { Story } = defineMeta({
		component: CategoryForm,
	});

	import { buildEmptyCategory } from '$lib/category/category.model';
</script>

<Story
	args={{
		category: buildEmptyCategory(),
		close: () => console.log('closed'),
		userId: '0',
	}}
	name="Primary"
/>
