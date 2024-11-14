<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GridCell from './GridCell.svelte';

	const { Story } = defineMeta({
		component: GridCell,
	});
</script>

<Story args={{}} name="Primary" />
