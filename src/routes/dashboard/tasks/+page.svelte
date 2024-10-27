<script lang="ts">
	import { type Category } from '$lib/category/utils';
	import Button from '$lib/components/form/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DB_PATH } from '$lib/consts';
	import { db } from '$lib/firebase';
	import { buildEmptyToDo, buildToDoWithDeadline } from '$lib/task/build-utils';
	import { type Task } from '$lib/task/utils';
	import { title } from '$lib/utils';
	import { DocumentText } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { collection, query, where } from 'firebase/firestore';
	import AuthGuard from '$lib/components/auth-guard/AuthGuard.svelte';

	import { sortTasksByDate } from './service';
	import TaskList from './task-list/TaskList.svelte';
	import TasksStats from './tasks-stats/TasksStats.svelte';
	import { Plus } from 'lucide-svelte';

	let editingTask: Task = $state(buildEmptyToDo([]));

	let isFormShown = $state(false);

	let isStatsShown = $state(false);

	function queryUncompletedTasks(userId: string) {
		const tasksRef = collection(db, `${DB_PATH.USERS}/${userId}/${DB_PATH.TASKS}`);
		return query(tasksRef, where('isDone', '==', false));
	}

	let categoryType: Category;

	let taskType: Task;

	title.set('Tasks');
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<AuthGuard>
		{#snippet data(user)}
			<TypedCollection
				ref={`${DB_PATH.USERS}/${user.uid}/${DB_PATH.CATEGORIES}`}
				type={categoryType}
			>
				{#snippet data(categories)}
					<div class="flex items-center justify-between">
						<h1 class="hidden text-2xl font-bold text-gray-900 md:block">{$title}</h1>
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
						<TypedCollection ref={queryUncompletedTasks(user.uid)} type={taskType}>
							{#snippet data(tasks)}
								{@const sortedTasks = sortTasksByDate(tasks)}
								<ul class="flex flex-col gap-3">
									{#each sortedTasks as date (date)}
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
											tasks={sortedTasks[date]}
											userId={user.uid}
										/>
									{/each}
								</ul>

								<Modal close={() => (isStatsShown = false)} isShown={isStatsShown}>
									<TasksStats {sortedTasks} />
								</Modal>
							{/snippet}
						</TypedCollection>

						<TaskFormWrapper
							bind:isShown={isFormShown}
							{categories}
							{editingTask}
							userId={user.uid}
						/>
					</div>
				{/snippet}
			</TypedCollection>
		{/snippet}
	</AuthGuard>
</div>
