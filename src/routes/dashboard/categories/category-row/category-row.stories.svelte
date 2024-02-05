<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { categories } from '$lib/category/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CategoryRow from './CategoryRow.svelte';

	export const meta = {
		component: CategoryRow,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<CategoryRow>;
</script>

<Template let:args>
	<div class="w-96">
		<CategoryRow {...args} />
	</div>
</Template>

<Story args={{ category: categories[0] }} name="Primary" />
