<script lang="ts">
	import { tasks } from '@life/shared/task';
	import { Calendar } from 'svelendar';
	// import 'svelendar/styles.css';
</script>

<!--<div style="height: 100vh">-->
<!--	<Calendar-->
<!--		changeDate={(date) => console.log('changeDate', date)}-->
<!--		createTask={(date) => console.log('createTask', date)}-->
<!--		editTask={(task, date) => console.log('editTask', task, date)}-->
<!--		moveEvent={(event, moveObject) => console.log('moveEvent', event, moveObject)}-->
<!--		persistTasks={(tasks) => console.log('tasks', tasks)}-->
<!--		{tasks}-->
<!--		toggleCompletion={(task, targetDate) => console.log('toggleCompletion', task, targetDate)}-->
<!--	/>-->
<!--</div>-->

<div class="relative flex items-stretch rounded-md bg-white shadow-sm">
	<button
		class="hmd:h-9 -8 flex w-9 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-0 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:relative"
	>
		x
	</button>

	<button
		class="border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative"
	>
		x
	</button>

	<button
		class="flex h-8 w-9 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-0 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:relative md:h-9"
	>
		x
	</button>
</div>
