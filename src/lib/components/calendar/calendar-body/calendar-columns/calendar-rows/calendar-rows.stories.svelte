<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CalendarRows from './CalendarRows.svelte';

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
