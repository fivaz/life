<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarTimeLabels from './CalendarTimeLabels.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarTimeLabels,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CalendarTimeLabels>;
</script>

<Template let:args>
	<CalendarTimeLabels {...args} />
</Template>

<Story args={{}} name="Primary" />
