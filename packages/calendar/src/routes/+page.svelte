<script lang="ts">
	import '$lib/styles.css';

	import { tasks } from '@life/shared/task';

	import Calendar from '$lib/Calendar.svelte';
</script>

<div style="height: 100vh">
	<Calendar
		changeDate={(date) => console.log('changeDate', date)}
		createTask={(date) => console.log('createTask', date)}
		editTask={(task, date) => console.log('editTask', task, date)}
		moveEvent={(event, moveObject) => console.log('moveEvent', event, moveObject)}
		persistTasks={(tasks) => console.log('tasks', tasks)}
		{tasks}
		toggleCompletion={(task, targetDate) => console.log('toggleCompletion', task, targetDate)}
	/>
</div>
