<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import WeekEventList from './WeekEventList.svelte';

	export const meta = {
		argTypes: {},
		component: WeekEventList,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<WeekEventList>;
</script>

<Template let:args>
	<WeekEventList {...args} />
</Template>

<Story args={{}} name="Primary" />
