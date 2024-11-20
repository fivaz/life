<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Button from '$lib/components/form/button/Button.svelte';

	import DropDown from './DropDown.svelte';

	const { Story } = defineMeta({
		component: DropDown,
	});

	let list = [
		{ label: 'option1', onclick: () => console.log('option 1 clicked') },
		{ label: 'option2', onclick: () => console.log('option 2 clicked') },
		{ label: 'option3', onclick: () => console.log('option 3 clicked') },
	];
</script>

{#snippet template(args: any)}
	<DropDown {...args}>
		<Button>Button</Button>
	</DropDown>
{/snippet}

<Story
	name="Top right"
	args={{ position: 'top-right', list, itemClass: 'text-center' }}
	children={template}
/>

<Story name="Top left" args={{ position: 'top-left', list }} children={template} />

<Story name="Bottom right" args={{ position: 'bottom-right', list }} children={template} />

<Story name="Bottom left" args={{ position: 'bottom-left', list }} children={template} />
