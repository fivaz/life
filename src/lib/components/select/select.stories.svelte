<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from './Select.svelte';

	export const meta = {
		component: Select,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered'
		}
	} satisfies Meta<Select>;
</script>

<script lang="ts">
	let selectedCategory: number = categories[0].id;
</script>

<Template let:args>
	<div class="w-96">
		{selectedCategory}
		<Select {...args} bind:value={selectedCategory}>
			{#each categories as category (category.id)}
				<SelectItem value={category.id}>{category.name}</SelectItem>
			{/each}
		</Select>
	</div>
</Template>

<Story name="With Label" />

<!--<Story name="Without Label" args={{ label: 'Label' }} />-->
