<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import RoutineHeader from './RoutineHeader.svelte';

	const { Story } = defineMeta({
		component: RoutineHeader,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
