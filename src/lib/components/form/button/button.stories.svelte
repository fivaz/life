<script module lang="ts">
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Button from './Button.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: Button,
	});
</script>

{#snippet template(args: any)}
	{#if !args.isOnlyIcon}
		<Button {...args} }><Icon class="h-4 w-4" src={Trash} />Button</Button>
	{:else}
		<Button {...args} }><Icon class="h-4 w-4" src={Trash} /></Button>
	{/if}
{/snippet}

<Story
	args={{
		color: 'indigo',
		disabled: false,
		isLoading: false,
		onclick: () => console.log('clicked'),
		isOnlyIcon: false,
	}}
	name="Primary"
	children={template}
/>

<Story
	args={{
		color: 'indigo',
		disabled: false,
		isLoading: false,
		onclick: () => console.log('clicked'),
		isOnlyIcon: true,
	}}
	name="With only Icon"
	children={template}
/>
