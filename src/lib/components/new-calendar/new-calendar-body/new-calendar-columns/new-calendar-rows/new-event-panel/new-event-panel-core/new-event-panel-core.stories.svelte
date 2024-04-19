<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewEventPanelCore from './NewEventPanelCore.svelte';

	export const meta = {
		argTypes: {},
		component: NewEventPanelCore,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewEventPanelCore>;
</script>

<Template let:args>
	<NewEventPanelCore {...args} />
</Template>

<Story args={{}} name="Primary" />
