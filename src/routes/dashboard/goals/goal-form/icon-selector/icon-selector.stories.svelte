<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import IconSelector from './IconSelector.svelte';

	export const meta = {
		argTypes: {},
		component: IconSelector,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<IconSelector>;
</script>

<Template let:args>
	<IconSelector {...args} />
</Template>

<Story args={{}} name="Primary" />
