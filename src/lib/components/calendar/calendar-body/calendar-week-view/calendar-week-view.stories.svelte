<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { events } from '$lib/task/seed';

	import CalendarWeekView from './CalendarWeekView.svelte';

	const { Story } = defineMeta({
		component: CalendarWeekView,
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
