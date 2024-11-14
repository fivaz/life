<script module lang="ts">
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { type Args, defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	import type { IncreaseArgs } from '../../../../../.storybook/special-types';
	import Button from './Button.svelte';

	const { Story } = defineMeta<IncreaseArgs<typeof Button, { isOnlyIcon: boolean }>>({
		component: Button,
		argTypes: {
			isOnlyIcon: {
				control: { type: 'boolean' },
			},
		},
		args: {
			isOnlyIcon: true,
			onclick: () => console.log('clicked1'),
		},
	});
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>)}
	{#if args.isOnlyIcon}
		<Button {...args}><Icon class="h-4 w-4" src={Trash} /></Button>
	{:else}
		<Button {...args}><Icon class="h-4 w-4" src={Trash} />Button</Button>
	{/if}
{/snippet}

<Story
	args={{
		color: 'indigo',
		disabled: false,
		isLoading: false,
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
		isOnlyIcon: true,
	}}
	name="With only Icon"
	children={template}
/>
