<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { auth, db } from '$lib/firebase';
	import type { OptionalId } from '$lib/form-utils';
	import { getTasksByDate } from '$lib/task/store';
	import type { ToDo } from '$lib/task/utils';
	import { collection, query, where } from 'firebase/firestore';
	import { SignedIn, userStore } from 'sveltefire';
	import { buildEmptyToDo, getSumOfDurationsAsTime } from './service';

	import TaskRow from './task-row/TaskRow.svelte';

	let editingTask: OptionalId<ToDo> = buildEmptyToDo([]);

	let showForm = false;

	const user = userStore(auth);

	const tasksRef = collection(db, `users/${$user?.uid}/tasks`);

	$: q = query(tasksRef, where('isDone', '==', false));
</script>

<SignedIn let:user>
	<SlimCollection ref={`users/${user.uid}/categories`} let:data={categories}>
		<SlimCollection ref={q} let:data={tasks}>
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

				<ul role="list" class="divide-y divide-gray-100">
					{#each Object.entries(getTasksByDate(tasks)) as [date, list] (date)}
						<div class="flex justify-between px-2">
							<div>{date}</div>
							<div>{getSumOfDurationsAsTime(list)}</div>
						</div>
						{#each list as task (task)}
							<TaskRow
								{task}
								on:edit={(e) => {
									showForm = true;
									editingTask = e.detail;
								}}
							/>
						{/each}
					{/each}
				</ul>

				<Modal show={showForm} on:close={() => (showForm = false)}>
					<TaskForm
						userId={user.uid}
						task={editingTask}
						{categories}
						on:close={() => (showForm = false)}
					/>
				</Modal>
			</div>
		</SlimCollection>
	</SlimCollection>
</SignedIn>
