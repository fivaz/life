<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { events } from '$lib/task/task.seed';

	import CalendarWeekView from './CalendarWeekView.svelte';

	const { Story } = defineMeta({
		component: CalendarWeekView,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story
	name="Primary"
	args={{
		tasks: events,
	}}
/>
