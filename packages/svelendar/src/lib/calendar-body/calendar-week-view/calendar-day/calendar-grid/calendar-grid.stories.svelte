<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CalendarGrid from './CalendarGrid.svelte';

	const { Story } = defineMeta({
		component: CalendarGrid,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
