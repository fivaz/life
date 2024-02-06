<script context="module" lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { Meta } from '@storybook/svelte';

	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		component: TypedCollection,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<TypedCollection<Category>>;
</script>

<Template let:args>
	<TypedCollection {...args}>button</TypedCollection>
</Template>

<Story args={{}} name="Primary" />
