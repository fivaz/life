<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import Category from './+page.svelte';

	export const meta = {
		component: Category,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered'
		}
	} satisfies Meta<Category>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-96">
		<Category {...args} />
	</div>
</Template>

<Story name="Primary" args={{ data: { categories, form: null } }} />
