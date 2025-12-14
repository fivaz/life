<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, screen, userEvent, within } from 'storybook/test';

	import { buildEmptyCategory } from '$lib/category/category.model';

	import CategoryFormButton from './CategoryFormButton.svelte';

	const { Story } = defineMeta({
		component: CategoryFormButton,
	});
</script>

<Story
	name="Primary"
	args={{
		category: buildEmptyCategory(),
	}}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole('button', { name: /New Category/i }));

		await expect(await screen.findByText('Add Category')).toBeInTheDocument();
		await expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();

		console.log('form open');
	}}
/>
