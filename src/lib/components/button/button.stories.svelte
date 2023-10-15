<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Button from './Button.svelte';

	export const meta = {
		component: Button,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered'
		},
		argTypes: {}
	} satisfies Meta<Button>;
</script>

<Template let:args>
	<Button {...args}>Text</Button>
</Template>

<Story name="Primary" args={{ className: 'bg-indigo-500' }} />

<Story name="IsLoading" args={{ isLoading: true, className: 'bg-red-500' }} />

<Story name="Label" args={{ isLoading: true, className: 'bg-red-500' }} let:args>
	<Button {...args}>Label</Button>
</Story>
