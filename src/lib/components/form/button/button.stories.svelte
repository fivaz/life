<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Button2 from './Button.svelte';

	export const meta = {
		argTypes: {},
		component: Button2,
	} satisfies Meta<Button2>;
</script>

<Template let:args>
	<Button2 {...args} on:click={() => console.log('clicked')}>Text</Button2>
</Template>

<Story args={{}} name="Normal" />

<Story args={{ isLoading: true }} name="Loading" />

<Story args={{ color: 'red', isLoading: true }} let:args name="Label">
	<Button2 {...args}>Label</Button2>
</Story>

<Story args={{ color: 'red', isLoading: true }} let:args name="Icon Loading">
	<Button2 {...args}><Icon class="h-4 w-4" src={Trash} /></Button2>
</Story>

<Story args={{ color: 'red', isLoading: false }} let:args name="Icon Normal">
	<Button2 {...args}><Icon class="h-4 w-4" src={Trash} /></Button2>
</Story>
