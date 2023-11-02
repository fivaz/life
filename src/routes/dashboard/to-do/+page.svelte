<script lang="ts">
	import { categories } from '$lib/category/store';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { EEvent } from '$lib/event/utils';
	import { toDos } from '$lib/to-do/store';
	import EventForm from '../calendar/event-form/EventForm.svelte';
	import { buildEmptyEventIn, convertToEventIn } from '../calendar/service';
	import type { EventIn } from '../calendar/service';
	import type { ActionData, PageData } from './$types';
	import ToDoForm from './to-do-form/ToDoForm.svelte';
	import ToDoRow from './to-do-row/ToDoRow.svelte';

	let showForm: boolean = false;
	export let form: ActionData | null = null;
	export let data: PageData;
	export let event: EventIn = buildEmptyEventIn([]);

	toDos.set(data.toDos);
	categories.set(data.categories);
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
				{form}
				on:edit={(e) => {
					showForm = true;
					event = convertToEventIn(e.detail);
				}}
			/>
		{/each}
	</ul>

	<Modal show={showForm} on:close={() => (showForm = false)}>
		<EventForm on:submit={() => (showForm = false)} {event} {form} categories={$categories} />
	</Modal>
</div>
