<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import WeekListSelector from './WeekListSelector.svelte';

	export const meta = {
		argTypes: {},
		component: WeekListSelector,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<WeekListSelector>;
</script>

<Template let:args>
	<WeekListSelector {...args} />
</Template>

<Story args={{}} name="Primary" />
