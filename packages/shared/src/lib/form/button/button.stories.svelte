<script lang="ts" module>
	import { Trash } from 'lucide-svelte';
	import type { Args } from '@storybook/addon-svelte-csf';
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';
	import type { Component, ComponentProps, SvelteComponent } from 'svelte';

	export type IncreaseArgs<
		ComponentType extends SvelteComponent | Component,
		AdditionalArgs
	> = Component<AdditionalArgs & ComponentProps<ComponentType>>;

	import Button from './Button.svelte';

	const { Story } = defineMeta<IncreaseArgs<typeof Button, { isOnlyIcon: boolean }>>({
		component: Button,
		argTypes: {
			isOnlyIcon: {
				control: { type: 'boolean' }
			}
		},
		args: {
			isOnlyIcon: true,
			onclick: () => console.log('clicked')
		}
	});
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>)}
	{#if args.isOnlyIcon}
		<Button {...args}><Trash class="h-4 w-4" /></Button>
	{:else}
		<Button {...args}><Trash class="h-4 w-4" />Button</Button>
	{/if}
{/snippet}

<Story
	name="Primary"
	args={{
		color: 'indigo',
		disabled: false,
		isLoading: false,
		isOnlyIcon: false
	}}
/>

<Story
	name="With only Icon"
	args={{
		color: 'indigo',
		disabled: false,
		isLoading: false,
		isOnlyIcon: true
	}}
/>
