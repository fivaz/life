<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CategoryForm from './CategoryForm.svelte';

	export const meta = {
		component: CategoryForm,
	} satisfies Meta<CategoryForm>;
</script>

<Template let:args>
	<CategoryForm {...args} />
</Template>

<Story
	args={{
		form: null,
	}}
	name="Primary"
/>
