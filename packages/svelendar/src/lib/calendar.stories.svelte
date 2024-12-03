<script lang="ts" module>
	import { tasks } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Calendar from './Calendar.svelte';

	const { Story } = defineMeta({
		component: Calendar,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}}>
	<div class="h-screen">
		<Calendar
			changeDate={(date) => console.log('changeDate', date)}
			createTask={(date) => console.log('createTask', date)}
			editTask={(task, date) => console.log('editTask', task, date)}
			moveEvent={(event, moveObject) => console.log('moveEvent', event, moveObject)}
			{tasks}
			toggleCompletion={(task, targetDate) => console.log('toggleCompletion', task, targetDate)}
		/>
	</div>
</Story>
