<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { events } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarRows from './CalendarRows.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarRows,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<CalendarRows>;
</script>

<script>
</script>

<Template let:args>
	<CalendarRows {...args} {events} />
</Template>

<Story args={{}} name="Primary" />
