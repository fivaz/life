<script context="module" lang="ts">
	import GridCell from './GridCell.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: GridCell,
	});
</script>

<Story args={{}} name="Primary" />
