<script module lang="ts">
	
import { events } from '$lib/task/seed';

	import { addDays } from 'date-fns';

	import CalendarColumns from './CalendarColumns.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: CalendarColumns,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story
	args={{
		dates: Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)),
		selectedDate: new Date(),
		tasks: events,
	}}
	name="Primary"
/>
