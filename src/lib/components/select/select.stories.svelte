<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import Select from './Select.svelte';

	export const meta = {
		component: Select,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
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
			valueField="id"
			nameField="name"
		/>
	</div>
</Template>

<Story name="With Label" />

<Story name="Without Label" args={{ label: 'Label' }} />

<Story
	name="With different key names"
	args={{
		items: categories.map((category) => ({
			value: category.id,
			label: category.name,
		})),
		valueField: 'value',
		nameField: 'label',
	}}
/>
