<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Dialog from './Dialog.svelte';

	export const meta = {
		component: Dialog,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Dialog>;
</script>

<Template let:args>
	<Dialog {...args} />
</Template>

<Story name="Primary" args={{ show: true }} />
