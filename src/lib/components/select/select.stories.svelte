<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { categories } from '$lib/category/seed';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Select from './Select.svelte';

	export const meta = {
		component: Select,
	} satisfies Meta<Select>;

	let selectedCategory = categories[0].id;
</script>

<Template let:args>
	<div class="w-96">
		<Select {...args} bind:value={selectedCategory} items={categories}>
			<span slot="placeholder">{categories[0].name}</span>
			{#each categories as category (category)}
				<SelectItem value={category}>{category.name}</SelectItem>
			{/each}
		</Select>
	</div>
</Template>

<Story name="With Label" />

<Story args={{ label: 'Label' }} name="Without Label" />
