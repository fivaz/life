<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewCalendarGrid from './NewCalendarGrid.svelte';

	export const meta = {
		argTypes: {},
		component: NewCalendarGrid,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewCalendarGrid>;
</script>

<Template let:args>
	<NewCalendarGrid {...args} />
</Template>

<Story args={{}} name="Primary" />
