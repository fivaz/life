<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewDayViewSide from './NewDayViewSide.svelte';

	export const meta = {
		argTypes: {},
		component: NewDayViewSide,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewDayViewSide>;
</script>

<Template let:args>
	<NewDayViewSide {...args}></NewDayViewSide>
</Template>

<Story args={{}} name="Primary" />
