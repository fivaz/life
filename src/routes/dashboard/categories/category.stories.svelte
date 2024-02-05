<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { categories } from '$lib/category/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Category from './+page.svelte';

	export const meta = {
		component: Category,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Category>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-96">
		<Category {...args} />
	</div>
</Template>

<Story args={{ data: { categories, form: null } }} name="Primary" />
