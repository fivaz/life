<script lang="ts" module>
	import Trash from '@lucide/svelte/icons/trash';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	import Button from './Button.svelte';

	const { Story } = defineMeta({
		component: Button,
	});

	type Args = ComponentProps<typeof Button>;
</script>

<Story
	name="Primary"
	args={{
		color: 'indigo',
		disabled: false,
		isLoading: false,
	}}
>
	{#snippet template({ children, ...args }: Args)}
		<Button {...args}><Trash class="size-4" /></Button>
	{/snippet}
</Story>

<Story
	name="With only Icon"
	args={{
		color: 'indigo',
		disabled: false,
		isLoading: false,
	}}
>
	{#snippet template({ children, ...args }: Args)}
		<Button {...args}><Trash class="size-4" />Button</Button>
	{/snippet}
</Story>
