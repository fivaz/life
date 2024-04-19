<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { ToDo } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { Document, DocumentCheck, EllipsisHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { SignedIn } from 'sveltefire';

	import { buildEmptyToDo } from '../../../routes/dashboard/tasks/service';

	export let toDos: ToDo[];

	let isOpen = false;

	let showForm = false;

	let editingTask = buildEmptyToDo([]);

	let categoryType: Category;
</script>

{#if toDos.length}
	<button
		class="w-full truncate rounded-lg bg-orange-50 px-2 py-1 text-xs leading-5 text-orange-500 hover:bg-orange-100 hover:font-semibold"
		on:click={() => (isOpen = true)}
	>
		{#if toDos.length > 1}
			{toDos.length} tasks
		{:else}
			{toDos[0].name}
		{/if}
	</button>
{/if}

<Modal on:close={() => (isOpen = false)} show={isOpen}>
	<div class="relative w-96 overflow-hidden rounded-md bg-white p-3 text-sm font-semibold shadow">
		<h3 class="text-lg text-black">Pending Tasks</h3>
		{#each toDos as toDo (toDo)}
			<div class="flex gap-2 text-start">
				<Icon class="h-5 w-5 text-indigo-500" src={toDo.isDone ? DocumentCheck : Document} />
				<div class="flex-1 truncate">{toDo.name}</div>
				<button
					on:click={() => {
						editingTask = toDo;
						showForm = true;
					}}
				>
					<Icon class="h-5 w-5 text-indigo-500" src={EllipsisHorizontal} />
				</button>
			</div>
		{/each}
	</div>
</Modal>

<SignedIn let:user>
	<TypedCollection let:data={categories} ref={`users/${user.uid}/categories`} type={categoryType}>
		<Modal on:close={() => (showForm = false)} show={showForm}>
			<TaskForm
				{categories}
				on:close={() => (showForm = false)}
				task={editingTask}
				userId={user.uid}
			/>
		</Modal>
	</TypedCollection>
</SignedIn>
