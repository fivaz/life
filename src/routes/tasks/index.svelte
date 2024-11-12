<!--routify:meta reset="dashboard+" -->
<script lang="ts">
	import { DocumentText } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from 'lucide-svelte';

	import DBCategories from '$lib/category/DBCategories.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import DBGoals from '$lib/goal/DBGoals.svelte';
	import { buildUntimedTask, buildUntimedTaskWithDateSet } from '$lib/task/build-utils';
	import DBUndoneTasks from '$lib/task/DBUndoneTasks.svelte';
	import TaskForm from '$lib/task/task-form/TaskForm.svelte';
	import { type Task } from '$lib/task/utils';
	import { title } from '$lib/utils.svelte.js';

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
</script>

<DBCategories>
	{#snippet data(categories, userId)}
		<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>

				<div class="flex items-center gap-5">
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
				<DBUndoneTasks>
					{#snippet data(tasks)}
						{@const sortedTasksByDate = getTasksByDateSorted(tasks)}
						<ul class="flex flex-col gap-3">
							{#each sortedTasksByDate as dateGroup (dateGroup)}
								<TaskList
									label={dateGroup}
									create={(date) => {
										openForm();
										editingTask = buildUntimedTaskWithDateSet(categories, date);
									}}
									edit={(task) => {
										openForm();
										editingTask = task;
									}}
									tasks={sortedTasksByDate[dateGroup]}
									{userId}
								/>
							{/each}
						</ul>

						<Modal bind:isOpen={isStatsShown}>
							<TasksStats tasks={sortedTasksByDate} />
						</Modal>
					{/snippet}
				</DBUndoneTasks>

				<DBGoals>
					{#snippet data(goals)}
						<Modal bind:isOpen={isFormShown}>
							<TaskForm {userId} {categories} {goals} close={closeForm} task={editingTask} />
						</Modal>
					{/snippet}
				</DBGoals>
			</div>
		</div>
	{/snippet}
</DBCategories>
