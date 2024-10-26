<script context="module" lang="ts">
	import CalendarRows from './CalendarRows.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: CalendarRows,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story
	args={{
		date: new Date(),
		create: (time: string) => console.log('time', time),
	}}
	name="Primary"
/>
