<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { toDos } from '$lib/to-do/store';
	import type { ActionData, PageData } from './$types';
	import ToDoForm from './to-do-form/ToDoForm.svelte';
	import ToDoRow from './to-do-row/ToDoRow.svelte';

	let showForm: boolean = false;
	export let form: ActionData | null = null;
	export let data: PageData;

	toDos.set(data.toDos);
</script>

<div class="flex flex-col gap-5">
	<div class="flex justify-end">
		<Button
			on:click={() => {
				showForm = true;
				form = null;
			}}
		>
			create To Do
		</Button>
	</div>

	<ul role="list" class="divide-y divide-gray-100">
		{#each $toDos as toDo (toDo)}
			<ToDoRow
				{toDo}
				on:edit={(e) => {
					showForm = true;
					form = {
						saved: e.detail,
					};
				}}
			/>
		{/each}
	</ul>

	<Modal show={showForm} on:close={() => (showForm = false)}>
		<ToDoForm on:submit={() => (showForm = false)} {form} />
	</Modal>
</div>
