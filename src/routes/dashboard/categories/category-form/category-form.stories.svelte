<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import CategoryForm from './CategoryForm.svelte';
	import { buildEmptyCategory } from './service';

	export const meta = {
		component: CategoryForm,
	} satisfies Meta<CategoryForm>;
</script>

<Template let:args>
	<CategoryForm
		{...args}
		category={buildEmptyCategory()}
		on:close={() => console.log('closed')}
		userId="0"
	/>
</Template>

<Story args={{}} name="Primary" />
