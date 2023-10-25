<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import CategoryForm from './CategoryForm.svelte';

	export const meta = {
		component: CategoryForm,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<CategoryForm>;
</script>

<Template let:args>
	<CategoryForm {...args} />
</Template>

<Story
	name="Primary"
	args={{
		form: null,
	}}
/>
