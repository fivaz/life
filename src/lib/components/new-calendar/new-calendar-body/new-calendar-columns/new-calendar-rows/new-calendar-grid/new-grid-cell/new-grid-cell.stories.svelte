<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewGridCell from './NewGridCell.svelte';

	export const meta = {
		argTypes: {},
		component: NewGridCell,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewGridCell>;
</script>

<Template let:args>
	<NewGridCell {...args} />
</Template>

<Story args={{}} name="Primary" />
