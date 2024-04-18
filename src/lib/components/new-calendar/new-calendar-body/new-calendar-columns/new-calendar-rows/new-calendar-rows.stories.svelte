<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { events } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewCalendarRows from './NewCalendarRows.svelte';

	export const meta = {
		argTypes: {},
		component: NewCalendarRows,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewCalendarRows>;
</script>

<script>
	</script>

<Template let:args>
	<NewCalendarRows {...args} {events} />
</Template>

<Story args={{}} name="Primary" />
