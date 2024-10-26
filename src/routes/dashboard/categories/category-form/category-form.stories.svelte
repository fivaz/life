<script context="module" lang="ts">
	import CategoryForm from './CategoryForm.svelte';
	import { buildEmptyCategory } from './service';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: CategoryForm,
	});
</script>

<Story
	args={{
		category: buildEmptyCategory(),
		close: () => console.log('closed'),
		userId: '0',
	}}
	name="Primary"
/>
