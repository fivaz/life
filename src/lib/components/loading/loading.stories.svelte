<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Loading from './Loading.svelte';

	export const meta = {
		component: Loading,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Loading>;
</script>

<Template let:args>
	<Loading {...args} />
</Template>

<Story name="Primary" args={{}} />
