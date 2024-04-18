<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewCalendarBody from './NewCalendarBody.svelte';

	export const meta = {
		argTypes: {},
		component: NewCalendarBody,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewCalendarBody>;
</script>

<Template let:args>
	<NewCalendarBody {...args} />
</Template>

<Story args={{}} name="Primary" />
