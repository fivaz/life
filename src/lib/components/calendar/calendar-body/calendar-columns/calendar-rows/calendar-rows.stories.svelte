<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarRows from './CalendarRows.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarRows,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<CalendarRows>;

	import { tasks } from '$lib/task/seed.js';
</script>

<Template let:args>
	<CalendarRows {...args} date={new Date()} {tasks} />
</Template>

<Story args={{}} name="Primary" />
