<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import RoutineFormButton from './RoutineFormButton.svelte';

	const { Story } = defineMeta({
		component: RoutineFormButton,
	});

	import { userEvent, within } from '@storybook/test';

	import { buildEmptyRoutine } from '$lib/routine/routine.model';
</script>

<Story
	name="Primary"
	args={{
		routine: buildEmptyRoutine(),
	}}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole('button'));

		console.log('form open');
	}}
/>
