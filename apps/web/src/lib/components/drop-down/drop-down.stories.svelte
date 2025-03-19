<script lang="ts" module>
	import { Button } from '@life/shared';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DropDownItem from './drop-down-item/DropDownItem.svelte';
	import DropDown from './DropDown.svelte';

	const { Story } = defineMeta({
		component: DropDown,
	});
</script>

{#snippet template(args: any)}
	<DropDown {...args}>
		{#snippet button()}
			<Button>Button</Button>
		{/snippet}

		<DropDownItem onclick={() => console.log('option 1 clicked')}>
			option1 text very long
		</DropDownItem>
		<DropDownItem onclick={() => console.log('option 2 clicked')}>
			option2 text very long
		</DropDownItem>
		<DropDownItem class="w-48" onclick={() => console.log('option 3 clicked')}>
			option3 text very long
		</DropDownItem>
	</DropDown>
{/snippet}

<Story
	name="Top end, dont close after click"
	args={{ placement: 'top-end', class: 'w-48 text-center', closeAfterClick: false }}
	children={template}
/>

<Story name="Top start" args={{ placement: 'top-start' }} children={template} />

<Story name="Bottom end" args={{ placement: 'bottom-end' }} children={template} />

<Story name="Bottom start" args={{}} children={template} />
