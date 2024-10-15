<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import PlusButton from './PlusButton.svelte';

	export const meta = {
		argTypes: {},
		component: PlusButton,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<PlusButton>;
</script>

<Template let:args>
	<PlusButton {...args} />
</Template>

<Story args={{}} name="Primary" />
