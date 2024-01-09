<script lang="ts">
	import { categories } from '$lib/category/store';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { draggedEvent } from '$lib/dragged/store';
	import { updateTask } from '$lib/task/store';
	import { startOfWeek } from 'date-fns';

	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/home/$types';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import {
		buildEmptyTaskIn,
		buildEventWithTime,
		convertToEventIn,
		moveEvent,
		preserveEvent,
	} from './service';
	import type { TaskIn } from './service';
	import TaskForm from './task-form/TaskForm.svelte';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	let showForm: boolean = false;

	export let form: ActionData | null;

	let editingEvent: TaskIn = buildEmptyTaskIn($categories, true);
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader
		bind:weekStart
		{currentDate}
		on:create={() => {
			showForm = true;
			editingEvent = buildEmptyTaskIn($categories, true);
		}}
	/>
	<CalendarBody
		{weekStart}
		on:edit={(e) => {
			showForm = true;
			editingEvent = convertToEventIn(e.detail);
		}}
		on:create={(e) => {
			showForm = true;
			editingEvent = buildEventWithTime($categories, e.detail.date, e.detail.timeInterval);
		}}
		on:move={(e) => {
			if ($draggedEvent) {
				const event = moveEvent($draggedEvent, e.detail.date, e.detail.timeInterval);
				updateTask(event);
				preserveEvent(event);
			}
		}}
	/>
	<Modal show={showForm} on:close={() => (showForm = false)}>
		<TaskForm on:submit={() => (showForm = false)} {form} task={editingEvent} isOnlyEvent />
	</Modal>
</div>
