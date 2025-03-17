<script lang="ts">
	import { Button, LText, Modal } from '@life/shared';
	import { getGoalsForTasks } from '@life/shared/goal';
	import type { Task } from '@life/shared/task';
	import { where } from 'firebase/firestore';
	import { FileSearch2Icon } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import type { Goal } from '$lib/goal/goal.model';
	import { fetchGoals } from '$lib/goal/goal.repository';
	import { buildUntimedTask } from '$lib/task/build-utils';
	import { fetchTasks } from '$lib/task/task.repository';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';
	import { title } from '$lib/utils.svelte';

	import { getTasksByDateSorted } from './service';
	import TaskList from './task-list/TaskList.svelte';
	import TasksStats from './tasks-stats/TasksStats.svelte';

	let newTask = $state<Task>(buildUntimedTask([]));

	let isStatsShown = $state(false);

	title.value = 'Tasks';

	let tasks = $state<Task[]>([]);

	fetchTasks(tasks, where('isDone', '==', false));

	let categories = $state<Category[]>([]);

	$effect(() => {
		newTask = buildUntimedTask(categories);
	});

	fetchCategories(categories);

	const sortedTasksByDate = $derived(getTasksByDateSorted(tasks));

	let goals = $state<Goal[]>([]);

	fetchGoals(
		(unsortedGoals) => (goals = getGoalsForTasks(unsortedGoals)),
		where('isDone', '==', false),
	);
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

			<div class="border-darker h-7 border-r"></div>

			<TaskFormButton {categories} {goals} task={newTask} />
		</div>
	</div>

	<!--body-->
	<div class="flex flex-col gap-5">
		<ul class="flex flex-col gap-3">
			{#each sortedTasksByDate as dateGroup (dateGroup)}
				<!--{#if categories.length}-->
				<TaskList {categories} {goals} label={dateGroup} tasks={sortedTasksByDate[dateGroup]} />
				<!--{/if}-->
			{/each}
		</ul>

		<Modal bind:isOpen={isStatsShown}>
			<TasksStats tasks={sortedTasksByDate} />
		</Modal>
	</div>
</div>
