<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CategoryFormButton from './CategoryFormButton.svelte';

	const { Story } = defineMeta({
		component: CategoryFormButton,
	});

	import { buildEmptyCategory } from '$lib/category/category.model';
</script>

<Story
	name="Primary"
	args={{
		category: buildEmptyCategory(),
	}}
/>
