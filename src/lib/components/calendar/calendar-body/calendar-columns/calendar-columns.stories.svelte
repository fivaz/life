<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { events } from '$lib/task/seed';

	import CalendarColumns from './CalendarColumns.svelte';

	const { Story } = defineMeta({
		component: CalendarColumns,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story
	args={{
		tasks: events,
	}}
	name="Primary"
/>
