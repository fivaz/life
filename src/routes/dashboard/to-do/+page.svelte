<script lang="ts">
	import { categories } from '$lib/category/store';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { toDos } from '$lib/task/store';
	import type { TTask } from '$lib/task/utils';
	import { buildEmptyEventIn, convertToEventIn } from '../home/calendar/service';
	import type { EventIn } from '../home/calendar/service';
	import TaskForm from '../home/calendar/task-form/TaskForm.svelte';
	import type { ActionData } from './$types';
	import ToDoRow from './to-do-row/ToDoRow.svelte';

	let showForm: boolean = false;
	export let form: ActionData | null = null;
	export let event: EventIn = buildEmptyEventIn([]);

	export function getSumOfDurationsAsTime(events: TTask[]): string {
		const sumOfDurationsInMinutes = events.reduce((sum, event) => sum + event.duration, 0);
		const hours = Math.floor(sumOfDurationsInMinutes / 60);
		const remainingMinutes = sumOfDurationsInMinutes % 60;
		return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
	}
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
		{#each Object.entries($toDos) as [date, list] (date)}
			<div class="flex justify-between px-2">
				<div>{date}</div>
				<div>{getSumOfDurationsAsTime(list)}</div>
			</div>
			{#each list as toDo (toDo)}
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
		<TaskForm on:submit={() => (showForm = false)} {event} {form} />
	</Modal>
</div>
