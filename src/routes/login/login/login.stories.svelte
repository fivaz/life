<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Login from './Login.svelte';

	export const meta = {
		component: Login,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Login>;
</script>

<Template let:args>
	<Login {...args} />
</Template>

<Story name="Primary" />
