<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import ConfirmButton from './ConfirmButton.svelte';

	export const meta = {
		component: ConfirmButton,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<ConfirmButton>;
</script>

<Template let:args>
	<ConfirmButton {...args} />
</Template>

<Story args={{}} name="Primary" />
