<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import ProgressBar from './ProgressBar.svelte';

	export const meta = {
		component: ProgressBar,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<ProgressBar>;
</script>

<Template let:args>
	<ProgressBar {...args} />
</Template>

<Story
	args={{
		maxValue: 100,
		value: 75,
	}}
	name="Primary"
/>
