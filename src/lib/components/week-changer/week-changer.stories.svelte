<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import WeekChanger from './WeekChanger.svelte';

	export const meta = {
		argTypes: {},
		component: WeekChanger,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<WeekChanger>;
</script>

<Template let:args>
	<WeekChanger {...args} />
</Template>

<Story args={{}} name="Primary" />
