<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DbPaTH } from '$lib/consts';
	import { auth, db } from '$lib/firebase';
	import { buildEmptyToDo, buildToDoWithDeadline } from '$lib/task/build-utils';
	import { type AnyTask, queryUncompletedTasks } from '$lib/task/utils';
	import { DocumentText } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { SignedIn, collectionStore, userStore } from 'sveltefire';

	import { type SortedTaskType, sortTasksByDate } from './service';
	import TaskList from './task-list/TaskList.svelte';
	import TasksStats from './tasks-stats/TasksStats.svelte';

	let editingTask: AnyTask = buildEmptyToDo([]);

	let showForm = false;

	let showStats = false;

	const user = userStore(auth);

	let tasks: ReturnType<typeof collectionStore<AnyTask>>;

	$: {
		if ($user) {
			tasks = collectionStore<AnyTask>(db, queryUncompletedTasks($user.uid));
		}
	}

	let sortedTasks: SortedTaskType;

	$: {
		if ($tasks) {
			sortedTasks = sortTasksByDate($tasks);
		}
	}

	let categoryType: Category;
</script>

<div class="py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SignedIn let:user>
			<TypedCollection
				let:data={categories}
				ref={`${DbPaTH.USERS}/${user.uid}/${DbPaTH.CATEGORIES}`}
				type={categoryType}
			>
				<div class="flex flex-col gap-5">
					<div class="flex items-center justify-between">
						<h1 class="text-lg font-semibold leading-7 text-gray-900">Tasks</h1>
						<div class="flex items-center gap-2">
							<button
								class="rounded bg-white p-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								on:click={() => (showStats = true)}
								type="button"
							>
								<Icon class="h-5 w-5" src={DocumentText} />
							</button>
							<Button
								on:click={() => {
									showForm = true;
									editingTask = buildEmptyToDo(categories);
								}}
							>
								Create Task
							</Button>
						</div>
					</div>

					<ul class="flex flex-col gap-3">
						{#each sortedTasks as date (date)}
							<TaskList
								label={date}
								on:create={(e) => {
									showForm = true;
									editingTask = buildToDoWithDeadline(categories, e.detail);
								}}
								on:edit={(e) => {
									showForm = true;
									editingTask = e.detail;
								}}
								tasks={sortedTasks[date]}
								userId={user.uid}
							/>
						{/each}
					</ul>

					<TaskFormWrapper bind:show={showForm} {categories} {editingTask} userId={user.uid} />
				</div>
			</TypedCollection>
		</SignedIn>
	</div>
</div>

<Modal on:close={() => (showStats = false)} show={showStats}>
	<TasksStats on:close={() => (showStats = false)} {sortedTasks} />
</Modal>
