<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { AnyTask } from '$lib/task/utils';

	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { auth, db } from '$lib/firebase';
	import { buildEmptyToDo } from '$lib/task/build-utils';
	import { getTasksByDate } from '$lib/task/store';
	import { SignedIn, collectionStore, userStore } from 'sveltefire';

	import { getSumOfDurationsAsTime, queryUncompletedTasks } from './service';
	import TaskRow from './task-row/TaskRow.svelte';

	let editingTask: AnyTask = buildEmptyToDo([]);

	let showForm = false;

	let categoryType: Category;

	const user = userStore(auth);

	let tasks: ReturnType<typeof collectionStore<AnyTask>>;
	$: {
		if ($user) {
			tasks = collectionStore<AnyTask>(db, queryUncompletedTasks($user.uid));
		}
	}

	let sortedTasks: Record<string, AnyTask[]> & Iterable<string>;
	$: {
		if ($tasks) {
			sortedTasks = getTasksByDate($tasks);
		}
	}
</script>

<div class="py-4">
	<SignedIn let:user>
		<TypedCollection let:data={categories} ref={`users/${user.uid}/categories`} type={categoryType}>
			<div class="flex flex-col gap-5">
				<div class="flex justify-end">
					<Button
						on:click={() => {
							showForm = true;
							editingTask = buildEmptyToDo(categories);
						}}
					>
						Create Task
					</Button>
				</div>

				<ul class="divide-y divide-gray-100" role="list">
					{#each sortedTasks as date (date)}
						<div class="flex justify-between px-2">
							<div>{date}</div>
							<div>{getSumOfDurationsAsTime(sortedTasks[date])}</div>
						</div>
						{#each sortedTasks[date] as task (task)}
							<TaskRow
								on:edit={(e) => {
									showForm = true;
									editingTask = e.detail;
								}}
								{task}
							/>
						{/each}
					{/each}
				</ul>

				<Modal on:close={() => (showForm = false)} show={showForm}>
					<TaskForm
						{categories}
						on:close={() => (showForm = false)}
						task={editingTask}
						userId={user.uid}
					/>
				</Modal>
			</div>
		</TypedCollection>
	</SignedIn>
</div>
