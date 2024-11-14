<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CalendarGrid from './CalendarGrid.svelte';

	const { Story } = defineMeta({
		component: CalendarGrid,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
