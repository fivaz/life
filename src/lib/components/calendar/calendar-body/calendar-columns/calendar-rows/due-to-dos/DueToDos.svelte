<script lang="ts">
	import type { AnyTask, ToDo } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import { Document, DocumentCheck, EllipsisHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	export let toDos: ToDo[];

	let isOpen = false;

	const dispatch = createEventDispatcher<{ editTask: { targetDate: string; task: AnyTask } }>();

	$: hasPendingToDos = toDos.some((toDo) => toDo.isDone === false);
</script>

<!--there is a bug here that this truncate won't work if not inside a relative -> absolute div-->
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
	<div class="relative w-96 overflow-hidden rounded-md bg-white p-3 text-sm font-semibold shadow">
		<h3 class="text-lg text-black">Pending Tasks</h3>
		{#each toDos as toDo (toDo)}
			<div class="flex gap-2 text-start">
				<Icon class="h-5 w-5 text-indigo-500" src={toDo.isDone ? DocumentCheck : Document} />
				<div class="flex-1 truncate">{toDo.name}</div>
				<button on:click={() => dispatch('editTask', { targetDate: '', task: toDo })}>
					<Icon class="h-5 w-5 text-indigo-500" src={EllipsisHorizontal} />
				</button>
			</div>
		{/each}
	</div>
</Modal>
