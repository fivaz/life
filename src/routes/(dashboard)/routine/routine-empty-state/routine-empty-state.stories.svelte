<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import RoutineEmptyState from './RoutineEmptyState.svelte';

	const { Story } = defineMeta({
		component: RoutineEmptyState,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
