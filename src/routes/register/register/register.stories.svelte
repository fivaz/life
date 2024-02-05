<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Register from './Register.svelte';

	export const meta = {
		component: Register,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Register>;
</script>

<Template let:args>
	<Register {...args} />
</Template>

<Story args={{}} name="Primary" />
