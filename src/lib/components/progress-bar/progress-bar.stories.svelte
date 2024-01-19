<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import ProgressBar from './ProgressBar.svelte';

	export const meta = {
		component: ProgressBar,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<ProgressBar>;
</script>

<Template let:args>
	<ProgressBar {...args} />
</Template>

<Story
	name="Primary"
	args={{
		value: 75,
		maxValue: 100,
	}}
/>
