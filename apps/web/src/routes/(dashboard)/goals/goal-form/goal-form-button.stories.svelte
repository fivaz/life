<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { userEvent, within } from 'storybook/test';

	import { buildEmptyGoal } from '$lib/goal/goal.model';

	import GoalFormButton from './GoalFormButton.svelte';

	const { Story } = defineMeta({
		component: GoalFormButton,
	});
</script>

<Story
	name="Primary"
	args={{
		goal: buildEmptyGoal(),
	}}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		setInterval(async () => {
			const button = canvas.getByText('New Goal');
			await userEvent.click(button);
			console.log('form open');
		}, 1000);
	}}
/>
