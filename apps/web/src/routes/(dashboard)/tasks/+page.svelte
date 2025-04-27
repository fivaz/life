<script lang="ts">
	import { Button, LText, Modal } from '@life/shared';
	import { where } from 'firebase/firestore';
	import { FileSearch2Icon } from 'lucide-svelte';

	import { fetchTasks } from '$lib/task/task.repository';
	import NewTaskButton from '$lib/task/task-form/NewTaskButton.svelte';
	import { title } from '$lib/utils.svelte';

	import type { TaskLists } from './service';
	import { getTaskLists } from './service';
	import TaskListByPeriod from './task-by-period/TaskListByPeriod.svelte';
	import TasksStats from './TasksStats.svelte';

	title.value = 'Tasks';

	let tasksByPeriod = $state<TaskLists>({} as TaskLists);

	let isStatsShown = $state(false);

	fetchTasks((tasks) => (tasksByPeriod = getTaskLists(tasks)), where('isDone', '==', false));
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<!--header-->
	<div class="flex items-center justify-between gap-5">
		<div>
			<LText class="hidden text-2xl font-bold md:block">{title.value}</LText>
		</div>

		<div class="flex items-center justify-between gap-5 md:grow-0">
			<Button
				class="text-indigo-500"
				color="light"
				onclick={() => (isStatsShown = true)}
				padding="p-1.5"
			>
				<FileSearch2Icon class="size-5" />
			</Button>

			<div class=" h-7 border-r border-gray-300 dark:border-gray-700"></div>

			<NewTaskButton />
		</div>
	</div>

	<!--body-->
	<div class="flex flex-col gap-5">
		<ul class="flex flex-col gap-3">
			{#each Object.keys(tasksByPeriod) as period}
				<TaskListByPeriod {period} bind:tasksByPeriod />
			{/each}
		</ul>
	</div>
</div>

<Modal bind:isOpen={isStatsShown}>
	<TasksStats {tasksByPeriod} />
</Modal>
