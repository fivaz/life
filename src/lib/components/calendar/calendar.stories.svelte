<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { tasks } from '$lib/task/task.seed';

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
			changeWeek={(week) => console.log('changeWeek', week)}
			createTask={(date) => console.log('createTask', date)}
			editTask={(task, date) => console.log('editTask', task, date)}
			moveEvent={(event, moveObject) => console.log('moveEvent', event, moveObject)}
			persistTasks={(tasks) => console.log('tasks', tasks)}
			{tasks}
			toggleEvent={(event, targetDate) => console.log('toggleEvent', event, targetDate)}
		/>
	</div>
</Story>
