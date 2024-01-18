<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import CategoryRow from './CategoryRow.svelte';

	export const meta = {
		component: CategoryRow,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<CategoryRow>;
</script>

<Template let:args>
	<div class="w-96">
		<CategoryRow {...args} />
	</div>
</Template>

<Story name="Primary" args={{ category: categories[0] }} />
