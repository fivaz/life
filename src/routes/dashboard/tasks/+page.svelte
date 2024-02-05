<script lang="ts">
	import type { ToDo } from '$lib/task/utils';

	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { auth, db } from '$lib/firebase';
	import { getTasksByDate } from '$lib/task/store';
	import { collection, query, where } from 'firebase/firestore';
	import { SignedIn, userStore } from 'sveltefire';

	import { buildEmptyToDo, getSumOfDurationsAsTime } from './service';
	import TaskRow from './task-row/TaskRow.svelte';

	let editingTask: ToDo = buildEmptyToDo([]);

	let showForm = false;

	const user = userStore(auth);

	const tasksRef = collection(db, `users/${$user?.uid}/tasks`);

	$: q = query(tasksRef, where('isDone', '==', false));
</script>

<SignedIn let:user>
	<SlimCollection let:data={categories} ref={`users/${user.uid}/categories`}>
		<SlimCollection let:data={tasks} ref={q}>
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
					{#each Object.entries(getTasksByDate(tasks)) as [date, list] (date)}
						<div class="flex justify-between px-2">
							<div>{date}</div>
							<div>{getSumOfDurationsAsTime(list)}</div>
						</div>
						{#each list as task (task)}
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
		</SlimCollection>
	</SlimCollection>
</SignedIn>
