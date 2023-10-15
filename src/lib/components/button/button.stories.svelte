<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';

	export const meta = {
		component: Button,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered'
		},
		argTypes: {}
	} satisfies Meta<Button>;
</script>

<script lang="ts">
	import Button from './Button.svelte';
</script>

<Template let:args>
	<Button {...args}>Text</Button>
</Template>

<Story name="Primary" source args={{ className: 'bg-indigo-500' }} />

<Story name="IsLoading" args={{ isLoading: true, className: 'bg-red-500' }} />
