<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import GridCell from './GridCell.svelte';

	export const meta = {
		component: GridCell,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<GridCell>;
</script>

<Template let:args>
	<GridCell {...args} />
</Template>

<Story args={{}} name="Primary" />
