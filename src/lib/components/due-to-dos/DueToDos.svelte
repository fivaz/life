<script lang="ts">
	import { Calendar } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { TTask } from '$lib/task/utils';

	export let toDos: TTask[];

	let isOpen = false;
</script>

{#if toDos.length}
	<button on:click={() => (isOpen = true)}>{toDos.length} pending tasks</button>
{/if}

<Modal show={isOpen} on:close={() => (isOpen = false)}>
	<div class="p-3 shadow rounded-md overflow-hidden relative bg-white text-sm font-semibold">
		<h3 class="text-lg text-black">Pending Tasks</h3>
		{#each toDos as toDo (toDo)}
			<div class="flex gap-2 items-center">
				<Icon src={Calendar} class="h-5 w-5 text-indigo-500" />
				<div>{toDo.name}</div>
			</div>
		{/each}
	</div>
</Modal>
