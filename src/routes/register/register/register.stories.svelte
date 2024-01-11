<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Register from './Register.svelte';

	export const meta = {
		component: Register,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Register>;
</script>

<Template let:args>
	<Register {...args} />
</Template>

<Story name="Primary" args={{}} />
