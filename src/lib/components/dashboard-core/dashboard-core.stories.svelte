<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import DashboardCore from './DashboardCore.svelte';

	export const meta = {
		argTypes: {},
		component: DashboardCore,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<DashboardCore>;
</script>

<Template let:args>
	<DashboardCore {...args} />
</Template>

<Story args={{}} name="Primary" />
