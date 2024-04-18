<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import WeekListMobile from './WeekListMobile.svelte';

	export const meta = {
		argTypes: {},
		component: WeekListMobile,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<WeekListMobile>;
</script>

<Template let:args>
	<WeekListMobile {...args}></WeekListMobile>
</Template>

<Story args={{}} name="Primary" />
