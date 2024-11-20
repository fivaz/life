<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CategoryForm from './CategoryForm.svelte';

	const { Story } = defineMeta({
		component: CategoryForm,
	});

	import { buildEmptyCategory } from '$lib/category/category.model';
</script>

<Story
	name="Primary"
	args={{
		category: buildEmptyCategory(),
	}}
/>
