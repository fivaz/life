<script lang="ts">
	import { categories } from '$lib/category/store';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { toDos } from '$lib/event/store';
	import type { EEvent } from '$lib/event/utils';
	import { DATE_FR } from '$lib/utils';
	import { format } from 'date-fns';
	import EventForm from '../home/calendar/event-form/EventForm.svelte';
	import { buildEmptyEventIn, convertToEventIn } from '../home/calendar/service';
	import type { EventIn } from '../home/calendar/service';
	import type { ActionData } from './$types';
	import ToDoRow from './to-do-row/ToDoRow.svelte';

	let showForm: boolean = false;
	export let form: ActionData | null = null;
	export let event: EventIn = buildEmptyEventIn([]);

	$: groupedToDos = $toDos.reduce<Record<string, EEvent[]>>((groups, event) => {
		const date = format(event.startDate, DATE_FR);
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(event);
		return groups;
	}, {});
</script>

<div class="flex flex-col gap-5">
	<div class="flex justify-end">
		<Button
			on:click={() => {
				showForm = true;
				event = buildEmptyEventIn($categories);
			}}
		>
			create To Do
		</Button>
	</div>

	<ul role="list" class="divide-y divide-gray-100">
		{#each Object.entries(groupedToDos) as [date, toDos] (date)}
			<div>{date}</div>
			{#each toDos as toDo (toDo)}
				<ToDoRow
					{toDo}
					{form}
					on:edit={(e) => {
						showForm = true;
						event = convertToEventIn(e.detail);
					}}
				/>
			{/each}
		{/each}
	</ul>

	<Modal show={showForm} on:close={() => (showForm = false)}>
		<EventForm on:submit={() => (showForm = false)} {event} {form} />
	</Modal>
</div>
