<script lang="ts">
	import { LText } from '@life/shared';
	import type { Task } from '@life/shared/task';
	import { where } from 'firebase/firestore';

	import { fetchTasks } from '$lib/task/task.repository';
	import { title } from '$lib/utils.svelte.js';

	import type { TaskLists } from './service';
	import { getTaskLists } from './service';
	import TaskListByPeriod from './TaskListByPeriod.svelte';

	title.value = 'Tasks';

	let tasksByPeriod = $state<TaskLists>({} as TaskLists);

	fetchTasks(listTaskByPeriod, where('isDone', '==', false));

	function listTaskByPeriod(tasks: Task[]) {
		tasksByPeriod = getTaskLists(tasks);
	}
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<!--header-->
	<div class="flex items-center justify-between gap-5">
		<div>
			<LText class="hidden text-2xl font-bold md:block">{title.value}</LText>
		</div>

		<div class="flex items-center justify-between gap-5 md:grow-0">
			<!--			<Button-->
			<!--				class="text-indigo-500"-->
			<!--				color="light"-->
			<!--				onclick={() => (isStatsShown = true)}-->
			<!--				padding="p-1.5"-->
			<!--			>-->
			<!--				<FileSearch2Icon class="size-5" />-->
			<!--			</Button>-->

			<div class=" h-7 border-r border-gray-300 dark:border-gray-700"></div>

			<!--			<TaskFormButton task={newTask} />-->
		</div>
	</div>

	<!--body-->
	<div class="flex flex-col gap-5">
		<ul class="flex flex-col gap-3">
			{#each Object.entries(tasksByPeriod) as [listName, taskList]}
				<TaskListByPeriod {listName} tasks={taskList} />
			{/each}
		</ul>
	</div>
</div>
