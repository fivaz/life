<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import EventsList from './EventsList.svelte';

	export const meta = {
		argTypes: {},
		component: EventsList,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<EventsList>;
</script>

<Template let:args>
	<EventsList {...args} />
</Template>

<Story args={{}} name="Primary" />
