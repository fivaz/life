<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Button from './Button.svelte';

	export const meta = {
		argTypes: {},
		component: Button,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Button>;
</script>

<script>
</script>

<Template let:args>
	<Button {...args}>Text</Button>
</Template>

<Story args={{}} name="Normal" />

<Story args={{ isLoading: true }} name="Loading" />

<Story args={{ color: 'red', isLoading: true }} let:args name="Label">
	<Button {...args}>Label</Button>
</Story>

<Story args={{ color: 'red', isLoading: true }} let:args name="Icon Loading">
	<Button {...args}><Icon class="h-4 w-4" src={Trash} /></Button>
</Story>

<Story args={{ color: 'red', isLoading: false }} let:args name="Icon Normal">
	<Button {...args}><Icon class="h-4 w-4" src={Trash} /></Button>
</Story>
