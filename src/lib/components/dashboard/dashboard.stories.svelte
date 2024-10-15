<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Dashboard from './Dashboard.svelte';

	export const meta = {
		argTypes: {},
		component: Dashboard,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<Dashboard>;
</script>

<Template let:args>
	<Dashboard {...args} />
</Template>

<Story args={{}} name="Primary" />
