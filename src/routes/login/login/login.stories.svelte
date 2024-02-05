<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Login from './Login.svelte';

	export const meta = {
		component: Login,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Login>;
</script>

<Template let:args>
	<Login {...args} />
</Template>

<Story name="Primary" />
