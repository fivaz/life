<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewCalendar from './NewCalendar.svelte';

	export const meta = {
		argTypes: {},
		component: NewCalendar,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewCalendar>;
</script>

<Template let:args>
	<NewCalendar {...args}></NewCalendar>
</Template>

<Story args={{}} name="Primary" />
