<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { userEvent, within } from '@storybook/test';

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

		await userEvent.click(canvas.getByRole('button'));

		console.log('form open');
	}}
/>
