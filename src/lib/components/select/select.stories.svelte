<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { categories } from '$lib/category/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Select from './Select.svelte';

	export const meta = {
		component: Select,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Select>;
</script>

<script lang="ts">
	let selectedCategory = categories[0].id;
</script>

<Template let:args>
	<div class="w-96">
		<Select
			{...args}
			bind:value={selectedCategory}
			items={categories}
			nameField="name"
			valueField="id"
		/>
	</div>
</Template>

<Story name="With Label" />

<Story args={{ label: 'Label' }} name="Without Label" />

<Story
	args={{
		items: categories.map((category) => ({
			label: category.name,
			value: category.id,
		})),
		nameField: 'label',
		valueField: 'value',
	}}
	name="With different key names"
/>
