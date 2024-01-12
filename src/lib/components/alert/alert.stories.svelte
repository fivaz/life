<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Alert from './Alert.svelte';

	export const meta = {
		component: Alert,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Alert>;
</script>

<Template let:args>
	<Alert {...args} />
</Template>

<Story name="Primary" args={{}} />
