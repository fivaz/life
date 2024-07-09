<script lang="ts">
	import type { ToDo } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import { clsx } from 'clsx';

	import ToDoList from './to-do-list/ToDoList.svelte';

	export let toDos: ToDo[];

	let isOpen = false;

	$: hasPendingToDos = toDos.some((toDo) => toDo.isDone === false);

	function getToDosName(toDos: ToDo[]): string {
		if (toDos.length === 0) {
			return '';
		}
		if (toDos.length === 1) {
			return toDos[0].name;
		}
		if (toDos.every((toDo) => toDo.isDone === true)) {
			return `${toDos.length} tasks`;
		}
		const pendingToDos = toDos.filter((toDo) => toDo.isDone === false).length;
		return `${pendingToDos} / ${toDos.length} tasks`;
	}
</script>

<!--there is a bug here that this truncate won't work if not inside a relative -> absolute hierarchy-->
<div class="relative">
	{#if toDos.length}
		<button
			class={clsx(
				hasPendingToDos
					? 'bg-orange-50 text-orange-500 hover:bg-orange-100'
					: 'bg-cyan-50 text-cyan-500 hover:bg-cyan-100',
				'absolute w-full truncate rounded-lg px-2 py-1 text-xs leading-5 hover:font-semibold',
			)}
			on:click={() => (isOpen = true)}
		>
			{getToDosName(toDos)}
		</button>
	{/if}
</div>

<Modal on:close={() => (isOpen = false)} show={isOpen}>
	<ToDoList on:close={() => (isOpen = false)} on:editTask on:persistToDos {toDos} />
</Modal>
