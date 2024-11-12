<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import RoutineRows from './RoutineRows.svelte';

	const { Story } = defineMeta({
		component: RoutineRows,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
