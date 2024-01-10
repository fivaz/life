<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import ConfirmButton from './ConfirmButton.svelte';

	export const meta = {
		component: ConfirmButton,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<ConfirmButton>;
</script>

<Template let:args>
	<ConfirmButton {...args} />
</Template>

<Story name="Primary" args={{}} />
