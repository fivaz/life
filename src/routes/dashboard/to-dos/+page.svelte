<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { auth, db } from '$lib/firebase';
	import { getToDos } from '$lib/task/store';
	import { parseTasks } from '$lib/task/utils';
	import { collection, query, where } from 'firebase/firestore';
	import { SignedIn, userStore } from 'sveltefire';
	import { parseCategories } from '../categories/service';
	import { buildEmptyToDo, getSumOfDurationsAsTime } from './service';
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
									console.log(e.detail);
									editingToDo = e.detail;
								}}
							/>
						{/each}
					{/each}
				</ul>

				<Modal show={showForm} on:close={() => (showForm = false)}>
					<TaskForm
						userId={user.uid}
						task={editingToDo}
						{categories}
						on:close={() => (showForm = false)}
					/>
				</Modal>
			</div>
		</SlimCollection>
	</SlimCollection>
</SignedIn>
