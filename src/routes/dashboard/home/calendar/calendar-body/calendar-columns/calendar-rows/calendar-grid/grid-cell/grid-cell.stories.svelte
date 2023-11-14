<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import GridCell from './GridCell.svelte';

	export const meta = {
		component: GridCell,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<GridCell>;
</script>

<Template let:args>
	<GridCell {...args} />
</Template>

<Story name="Primary" args={{}} />
