<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import LineChart from './LineChart.svelte';

	export const meta = {
		argTypes: {},
		component: LineChart,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<LineChart>;
</script>

<Template let:args>
	<LineChart {...args} />
</Template>

<Story args={{}} name="Primary" />
