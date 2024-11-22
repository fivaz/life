<script lang="ts">
	import { DocumentText } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { doc, where, writeBatch } from 'firebase/firestore';
	import { Plus } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import { fetchCategories } from '$lib/category/category.respository';
	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { title } from '$lib/date.utils.svelte';
	import { db } from '$lib/firebase';
	import type { Goal } from '$lib/goal/goal.model';
	import { fetchGoals, getGoalPath } from '$lib/goal/goal.repository';
	import { buildUntimedTask, buildUntimedTaskWithDateSet } from '$lib/task/build-utils';
	import type { Task } from '$lib/task/task.model';
	import { fetchTasks, getTaskPath } from '$lib/task/task.repository';
	import TaskForm from '$lib/task/task-form/TaskForm.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';

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

	fetchGoals(goals, where('isDone', '==', false));
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<div class="flex items-center justify-between">
		<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>

		<div class="flex w-full items-center justify-between gap-5 md:w-auto">
			<button
				class="rounded bg-white p-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				onclick={() => (isStatsShown = true)}
				type="button"
			>
				<Icon class="h-5 w-5" src={DocumentText} />
			</button>

			<div class="hidden h-7 border-r border-gray-300 md:block"></div>

			<Button
				onclick={() => {
					openForm();
					editingTask = buildUntimedTask(categories);
				}}
			>
				<Plus class="h-4 w-auto" />
				New Category
			</Button>
		</div>
	</div>

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
