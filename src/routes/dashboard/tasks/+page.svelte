<script lang="ts">
	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { buildEmptyToDo, buildToDoWithDeadline } from '$lib/task/build-utils';
	import { type Task } from '$lib/task/utils';

	import { DocumentText } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { getTasksByDateSorted } from './service';
	import TaskList from './task-list/TaskList.svelte';
	import TasksStats from './tasks-stats/TasksStats.svelte';
	import { Plus } from 'lucide-svelte';
	import { title } from '$lib/utils.svelte';
	import DBCategories from '$lib/category/DBCategories.svelte';
	import DBUndoneTasks from '$lib/task/DBUndoneTasks.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import DBGoals from '$lib/goal/DBGoals.svelte';

	let editingTask: Task = $state(buildEmptyToDo([]));

	let isFormShown = $state(false);

	let isStatsShown = $state(false);
</script>

<DBCategories>
	{#snippet data(categories, userId)}
		<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{title.value}</h1>
				<span></span>

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
							isFormShown = true;
							editingTask = buildEmptyToDo(categories);
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
						{@const sortedTasksGroup = getTasksByDateSorted(tasks)}
						<ul class="flex flex-col gap-3">
							{#each sortedTasksGroup as date (date)}
								<TaskList
									label={date}
									create={(deadline) => {
										isFormShown = true;
										editingTask = buildToDoWithDeadline(categories, deadline);
									}}
									edit={(task) => {
										isFormShown = true;
										editingTask = task;
									}}
									tasks={sortedTasksGroup[date]}
									{userId}
								/>
							{/each}
						</ul>

						<Modal bind:isOpen={isStatsShown}>
							<TasksStats tasks={sortedTasksGroup} />
						</Modal>
					{/snippet}
				</DBUndoneTasks>

				<DBGoals>
					{#snippet data(goals)}
						<Modal bind:isOpen={isFormShown}>
							<TaskForm
								{userId}
								{categories}
								{goals}
								close={() => (isFormShown = false)}
								task={editingTask}
							/>
						</Modal>
					{/snippet}
				</DBGoals>
			</div>
		</div>
	{/snippet}
</DBCategories>
