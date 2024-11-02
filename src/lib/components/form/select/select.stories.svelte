<script module lang="ts">
	import { categories } from '$lib/category/seed';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';

	import Select from './Select.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: Select,
	});

	let selectedCategory = $state(categories[0]);
</script>

{#snippet template(args: any)}
	<div class="w-96">
		<Select {...args} bind:value={selectedCategory}>
			{#snippet placeholder()}
				{selectedCategory.name}
			{/snippet}
			{#each categories as category (category)}
				<SelectItem value={category}>
					{category.name}
				</SelectItem>
			{/each}
		</Select>
	</div>
{/snippet}

<Story args={{ label: 'Label' }} name="With Label" children={template} />

<Story args={{}} name="Without Label" children={template} />
