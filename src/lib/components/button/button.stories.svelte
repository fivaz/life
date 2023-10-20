<script lang="ts" context="module">
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
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

<script>
</script>

<Template let:args>
	<Button {...args}>Text</Button>
</Template>

<Story name="Normal" args={{}} />

<Story name="Loading" args={{ isLoading: true }} />

<Story name="Label" args={{ isLoading: true, color: 'red' }} let:args>
	<Button {...args}>Label</Button>
</Story>

<Story name="Icon Loading" args={{ isLoading: true, color: 'red' }} let:args>
	<Button {...args}><Icon src={Trash} class="h-4 w-4" /></Button>
</Story>

<Story name="Icon Normal" args={{ isLoading: false, color: 'red' }} let:args>
	<Button {...args}><Icon src={Trash} class="h-4 w-4" /></Button>
</Story>
