<script lang="ts">
	import { Button, Modal } from '@life/shared';
	import { getGoalsForTasks } from '@life/shared/goal';
	import type { Task } from '@life/shared/task';
	import { DocumentText } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { where } from 'firebase/firestore';
	import { Plus } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import type { Goal } from '$lib/goal/goal.model';
	import { fetchGoals } from '$lib/goal/goal.repository';
	import { buildUntimedTask, buildUntimedTaskWithDateSet } from '$lib/task/build-utils';
	import { fetchTasks } from '$lib/task/task.repository';
	import TaskForm from '$lib/task/task-form/TaskForm.svelte';
	import { title } from '$lib/utils.svelte';

	import { getTasksByDateSorted } from './service';
	import TaskList from './task-list/TaskList.svelte';
	import TasksStats from './tasks-stats/TasksStats.svelte';

	let editingTask: Task = $state(buildUntimedTask([]));

	let isFormShown = $state(false);

	let isStatsShown = $state(false);

	title.value = 'Tasks';

	function openForm() {
		isFormShown = true;
	}

	function closeForm() {
		isFormShown = false;
	}

	let tasks = $state<Task[]>([]);

	fetchTasks(tasks, where('isDone', '==', false));

	let categories = $state<Category[]>([]);

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
			<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
		</div>

		<div class="flex items-center justify-between gap-5 md:grow-0">
			<button
				class="rounded bg-white p-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				onclick={() => (isStatsShown = true)}
				type="button"
			>
				<Icon class="h-5 w-5" src={DocumentText} />
			</button>

			<div class="h-7 border-r border-gray-300"></div>

			<Button
				onclick={() => {
					openForm();
					editingTask = buildUntimedTask(categories);
				}}
			>
				<Plus class="h-4 w-auto" />
				New Task
			</Button>
		</div>
	</div>

	<!--body-->
	<div class="flex flex-col gap-5">
		<ul class="flex flex-col gap-3">
			{#each sortedTasksByDate as dateGroup (dateGroup)}
				<TaskList
					create={(date) => {
						openForm();
						editingTask = buildUntimedTaskWithDateSet(categories, date);
					}}
					edit={(task) => {
						openForm();
						editingTask = task;
					}}
					label={dateGroup}
					tasks={sortedTasksByDate[dateGroup]}
				/>
			{/each}
		</ul>

		<Modal bind:isOpen={isStatsShown}>
			<TasksStats tasks={sortedTasksByDate} />
		</Modal>

		<Modal bind:isOpen={isFormShown}>
			<TaskForm {categories} close={closeForm} {goals} task={editingTask} />
		</Modal>
	</div>
</div>
