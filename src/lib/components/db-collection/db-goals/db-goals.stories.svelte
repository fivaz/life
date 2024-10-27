<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DbGoals from './DBGoals.svelte';

	const { Story } = defineMeta({
		component: DbGoals,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
