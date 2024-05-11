<script lang="ts">
	import type { ToDo } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import { clsx } from 'clsx';
	
import ToDoList from './to-do-list/ToDoList.svelte';

	export let toDos: ToDo[];

	let isOpen = false;

	$: hasPendingToDos = toDos.some((toDo) => toDo.isDone === false);
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
			{#if toDos.length > 1}
				{toDos.length} tasks
			{:else}
				{toDos[0].name}
			{/if}
		</button>
	{/if}
</div>

<Modal on:close={() => (isOpen = false)} show={isOpen}>
	<ToDoList {toDos} />
</Modal>
