<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import EventPanelCore from './EventPanelCore.svelte';

	export const meta = {
		argTypes: {},
		component: EventPanelCore,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<EventPanelCore>;
</script>

<Template let:args>
	<EventPanelCore {...args} />
</Template>

<Story args={{}} name="Primary" />
