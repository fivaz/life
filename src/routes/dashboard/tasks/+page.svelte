<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskFormWrapper from '$lib/components/task-form-wrapper/TaskFormWrapper.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DbPaTH } from '$lib/consts';
	import { auth, db } from '$lib/firebase';
	import { buildEmptyToDo, buildToDoWithDeadline } from '$lib/task/build-utils';
	import { type AnyTask, queryUncompletedTasks } from '$lib/task/utils';
	import { title } from '$lib/utils/store';
	import { DocumentText } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus } from 'lucide-svelte';
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

	title.set('Tasks');
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

					<!--to prevent the floating button from hiding any task-->
					<div class="h-20" />

					<div class="fixed bottom-4 right-8 flex flex-col items-center gap-3">
						<button
							class="rounded bg-white p-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							on:click={() => (showStats = true)}
							type="button"
						>
							<Icon class="h-5 w-5" src={DocumentText} />
						</button>

						<button
							class="flex items-center gap-2 rounded-full bg-indigo-600 p-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
							on:click={() => {
								showForm = true;
								editingTask = buildEmptyToDo(categories);
							}}
							type="button"
						>
							<Plus class="h-4 w-4" />
						</button>
					</div>

					<TaskFormWrapper bind:show={showForm} {categories} {editingTask} userId={user.uid} />
				</div>
			</TypedCollection>
		</SignedIn>
	</div>
</div>

<Modal on:close={() => (showStats = false)} show={showStats}>
	<TasksStats on:close={() => (showStats = false)} {sortedTasks} />
</Modal>
