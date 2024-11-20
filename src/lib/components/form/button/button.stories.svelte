<script lang="ts" module>
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { type Args, defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	import type { IncreaseArgs } from '../../../../../.storybook/utils';
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
			onclick: () => console.log('clicked'),
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
	name="Primary"
	args={{
		color: 'indigo',
		disabled: false,
		isLoading: false,
		isOnlyIcon: false,
	}}
/>

<Story
	name="With only Icon"
	args={{
		color: 'indigo',
		disabled: false,
		isLoading: false,
		isOnlyIcon: true,
	}}
/>
