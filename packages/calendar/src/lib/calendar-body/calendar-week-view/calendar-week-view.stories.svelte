<script lang="ts" module>
	import { events } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CalendarWeekView from './CalendarWeekView.svelte';

	const { Story } = defineMeta({
		component: CalendarWeekView,
		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<Story
	name="Primary"
	args={{
		tasks: events
	}}
/>
