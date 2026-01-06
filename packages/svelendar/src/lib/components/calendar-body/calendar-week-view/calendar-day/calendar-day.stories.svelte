<script lang="ts" module>
	import { tasks } from '@life/shared/task';
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
	name="Primary"
	args={{
		date: new Date(),
		create: (time: string) => console.log('time', time),
		tasks,
	}}
/>
