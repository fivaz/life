<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DbCategories from './DBCategories.svelte';

	const { Story } = defineMeta({
		component: DbCategories,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
