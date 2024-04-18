<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewCalendarHeader from './NewCalendarHeader.svelte';

	export const meta = {
		argTypes: {},
		component: NewCalendarHeader,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewCalendarHeader>;
</script>

<Template let:args>
	<NewCalendarHeader {...args}></NewCalendarHeader>
</Template>

<Story args={{}} name="Primary" />
