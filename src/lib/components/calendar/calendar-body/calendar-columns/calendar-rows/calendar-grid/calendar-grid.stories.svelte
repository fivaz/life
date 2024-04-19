<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CalendarGrid from './CalendarGrid.svelte';

	export const meta = {
		argTypes: {},
		component: CalendarGrid,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<CalendarGrid>;
</script>

<Template let:args>
	<CalendarGrid {...args} />
</Template>

<Story args={{}} name="Primary" />
