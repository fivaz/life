<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CategoryForm from './CategoryForm.svelte';
	import { buildEmptyCategory } from './service';

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
