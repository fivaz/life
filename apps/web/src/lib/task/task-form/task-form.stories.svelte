<script lang="ts" module>
	import { Dialog, dialog } from '@life/shared';
	import { categories } from '@life/shared/category';
	import { formatDate } from '@life/shared/date';
	import { goals } from '@life/shared/goal';
	import { normalWithSubTasks } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { userEvent, within } from 'storybook/test';

	import { buildTimedTask, buildUntimedTask } from '$lib/task/build-utils';

	import TaskFormButton from './TaskFormButton.svelte';

	const { Story } = defineMeta({
		component: TaskFormButton,
	});
</script>

{#snippet template(args: any)}
	<Dialog
		cancelText={dialog.value.cancelText}
		confirmText={dialog.value.confirmText}
		isOpen={dialog.value.show}
		message={dialog.value.message}
		resolve={dialog.value.resolve}
		title={dialog.value.title}
	/>
	<div class="w-96">
		<TaskFormButton close={() => console.log('closed')} {goals} userId="" {...args} />
	</div>
{/snippet}

<Story
	name="Create Event"
	args={{
		targetDate: formatDate(new Date()),
		task: buildTimedTask(categories),
	}}
	children={template}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole('button'));

		console.log('form open');
	}}
/>

<Story
	name="Edit event"
	args={{
		targetDate: formatDate(new Date()),
		task: normalWithSubTasks,
	}}
	children={template}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole('button'));

		console.log('form open');
	}}
/>

<Story
	name="Create ToDo"
	args={{
		task: buildUntimedTask(categories),
	}}
	children={template}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByRole('button'));

		console.log('form open');
	}}
/>
