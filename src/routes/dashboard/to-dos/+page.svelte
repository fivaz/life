<script lang="ts">
	import { categories } from '$lib/category/store';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { closeModal, isModalVisible, openModal } from '$lib/form-modal/store';
	import { toDos } from '$lib/task/store';
	import type { TTask } from '$lib/task/utils';
	import { buildEmptyTaskIn, convertToEventIn } from '../home/calendar/service';
	import type { TaskIn } from '../home/calendar/service';
	import TaskForm from '../home/calendar/task-form/TaskForm.svelte';
	import type { ActionData } from './$types';
	import ToDoRow from './to-do-row/ToDoRow.svelte';

	export let form: ActionData | null = null;

	let editingToDo: TaskIn = buildEmptyTaskIn([], false);

	export function getSumOfDurationsAsTime(tasks: TTask[]): string {
		const sumOfDurationsInMinutes = tasks.reduce((sum, task) => sum + (task.duration || 0), 0);
		const hours = Math.floor(sumOfDurationsInMinutes / 60);
		const remainingMinutes = sumOfDurationsInMinutes % 60;
		return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
	}
</script>

<div class="flex flex-col gap-5">
	<div class="flex justify-end">
		<Button
			on:click={() => {
				openModal();
				editingToDo = buildEmptyTaskIn($categories, false);
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
						openModal();
						editingToDo = convertToEventIn(e.detail);
					}}
				/>
			{/each}
		{/each}
	</ul>

	<Modal show={$isModalVisible} on:close={() => closeModal()}>
		<TaskForm {form} task={editingToDo} isOnlyEvent={false} />
	</Modal>
</div>
