<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import type { TaskIn } from '$lib/components/task-form/service';
	import { buildEmptyTaskIn, convertToTaskIn } from '$lib/components/task-form/service';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { auth, db } from '$lib/firebase';
	import { getToDos, groupedToDos } from '$lib/task/store';
	import type { Task } from '$lib/task/utils';
	import { collection, query, where } from 'firebase/firestore';
	import { collectionStore, SignedIn, userStore } from 'sveltefire';
	import { string } from 'yup';
	import CategoryForm from '../categories/category-form/CategoryForm.svelte';
	import { parseCategories } from '../categories/service';
	import { buildEmptyGoal } from '../goals/service';
	import type { ActionData } from './$types';
	import { buildEmptyToDo, getSumOfDurationsAsTime, parseTasks } from './service';
	import ToDoRow from './to-do-row/ToDoRow.svelte';

	let editingToDo = buildEmptyToDo([]);

	let showForm = false;

	const user = userStore(auth);

	const tasksRef = collection(db, `users/${$user?.uid}/tasks`);
	$: q = query(tasksRef, where('isDone', '==', false));
</script>

<SignedIn let:user>
	<SlimCollection
		ref={`users/${user.uid}/categories`}
		parse={parseCategories}
		let:data={categories}
	>
		<SlimCollection ref={q} parse={parseTasks} let:data={tasks}>
			<div class="flex flex-col gap-5">
				<div class="flex justify-end">
					<Button
						on:click={() => {
							showForm = true;
							editingToDo = buildEmptyToDo(categories);
						}}
					>
						Create Task
					</Button>
				</div>

				<ul role="list" class="divide-y divide-gray-100">
					{#each Object.entries(getToDos(tasks)) as [date, list] (date)}
						<div class="flex justify-between px-2">
							<div>{date}</div>
							<div>{getSumOfDurationsAsTime(list)}</div>
						</div>
						{#each list as task (task)}
							<ToDoRow
								{task}
								on:edit={(e) => {
									showForm = true;
								}}
							/>
						{/each}
					{/each}
				</ul>

				<Modal show={showForm} on:close={() => (showForm = false)}>
					<TaskForm
						userId={user.uid}
						{categories}
						task={editingToDo}
						on:close={() => (showForm = false)}
					/>
				</Modal>
			</div>
		</SlimCollection>
	</SlimCollection>
</SignedIn>
