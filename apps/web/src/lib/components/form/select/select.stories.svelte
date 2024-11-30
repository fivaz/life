<script lang="ts" module>
	import { categories } from '@life/shared/category';
	import type { Args } from '@storybook/addon-svelte-csf';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';

	import Select from './Select.svelte';

	const { Story } = defineMeta({
		component: Select,
	});

	let selectedCategory = $state(categories[0]);
</script>

{#snippet template(args: Args<typeof Story>)}
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

<Story name="With Label" args={{ label: 'Label' }} children={template} />

<Story name="Without Label" args={{}} children={template} />
