<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { toDos } from '$lib/event/store';
	import EventForm from '../home/calendar/event-form/EventForm.svelte';
	import { buildEmptyEventIn, convertToEventIn } from '../home/calendar/service';
	import type { EventIn } from '../home/calendar/service';
	import type { ActionData } from './$types';
	import ToDoRow from './to-do-row/ToDoRow.svelte';

	let showForm: boolean = false;
	export let form: ActionData | null = null;
	export let event: EventIn = buildEmptyEventIn([]);
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
		<EventForm on:submit={() => (showForm = false)} {event} {form} />
	</Modal>
</div>
