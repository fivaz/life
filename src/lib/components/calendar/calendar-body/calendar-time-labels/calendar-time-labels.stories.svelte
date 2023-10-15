<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import CalendarTimeLabels from './CalendarTimeLabels.svelte';

	export const meta = {
		component: CalendarTimeLabels,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered'
		},
		argTypes: {}
	} satisfies Meta<CalendarTimeLabels>;
</script>

<Template let:args>
	<CalendarTimeLabels {...args} />
</Template>

<Story name="Primary" args={{}} />
