<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CalendarDay from './CalendarDay.svelte';

	const { Story } = defineMeta({
		component: CalendarDay,
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
