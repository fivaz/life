<script lang="ts" module>
	import { Button } from '@life/shared';
	import { defineMeta } from '@storybook/addon-svelte-csf';

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
	name="Top end"
	args={{ placement: 'top-end', list, itemClass: 'text-center' }}
	children={template}
/>

<Story name="Top start" args={{ placement: 'top-start', list }} children={template} />

<Story name="Bottom end" args={{ placement: 'bottom-end', list }} children={template} />

<Story name="Bottom start" args={{ placement: 'bottom-start', list }} children={template} />
