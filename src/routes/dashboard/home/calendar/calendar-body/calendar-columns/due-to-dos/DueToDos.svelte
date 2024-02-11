<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { ToDo } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { Document, DocumentCheck, EllipsisHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { SignedIn } from 'sveltefire';

	import { buildEmptyToDo } from '../../../../../tasks/service';

	export let toDos: ToDo[];

	let isOpen = false;

	let showForm = false;

	let editingTask = buildEmptyToDo([]);

	let categoryType: Category;
</script>

<div>
	<div class="h-4">
		{#if toDos.length}
			<button on:click={() => (isOpen = true)}>{toDos.length} tasks</button>
		{/if}
	</div>

	<Modal on:close={() => (isOpen = false)} show={isOpen}>
		<div class="p-3 shadow rounded-md overflow-hidden relative bg-white text-sm font-semibold w-96">
			<h3 class="text-lg text-black">Pending Tasks</h3>
			{#each toDos as toDo (toDo)}
				<div class="flex gap-2 items-center justify-between">
					<div class="flex gap-2">
						<Icon class="h-5 w-5 text-indigo-500" src={toDo.isDone ? DocumentCheck : Document} />
						<div class="truncate">{toDo.name}</div>
					</div>
					<div
						on:click={() => {
							editingTask = toDo;
							showForm = true;
						}}
						on:keyup
						role="button"
						tabindex="0"
					>
						<Icon class="h-5 w-5 text-indigo-500" src={EllipsisHorizontal} />
					</div>
				</div>
			{/each}
		</div>
		<SignedIn let:user>
			<TypedCollection
				let:data={categories}
				ref={`users/${user.uid}/categories`}
				type={categoryType}
			>
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
	</Modal>
</div>
