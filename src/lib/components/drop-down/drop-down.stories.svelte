<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DropDown from './DropDown.svelte';
	import Button from '$lib/components/form/button/Button.svelte';

	const { Story } = defineMeta({
		component: DropDown,
	});

	let list = [
		{ label: 'option1', onclick: () => console.log('option 1 clicked') },
		{ label: 'option2', onclick: () => console.log('option 2 clicked') },
		{ label: 'option3', onclick: () => console.log('option 3 clicked') },
	];
</script>

<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any-->
{#snippet template(args: any)}
	<DropDown {...args}>
		<Button>Button</Button>
	</DropDown>
{/snippet}

<Story
	args={{ position: 'top-right', list, itemClass: 'text-center' }}
	name="Top right"
	children={template}
/>

<Story args={{ position: 'top-left', list }} name="Top left" children={template} />

<Story args={{ position: 'bottom-right', list }} name="Bottom right" children={template} />

<Story args={{ position: 'bottom-left', list }} name="Bottom left" children={template} />
