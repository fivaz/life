<script lang="ts">
	import { categories } from '$lib/category/store';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { draggedEvent } from '$lib/dragged/store';
	import { closeModal, isModalVisible, openModal } from '$lib/form-modal/store';
	import { updateTasks } from '$lib/task/store';
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

	let targetDate: Date | null = null;

	export let form: ActionData | null;

	let editingEvent: TaskIn = buildEmptyTaskIn($categories, true);
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader
		bind:weekStart
		{currentDate}
		on:create={() => {
			openModal();
			editingEvent = buildEmptyTaskIn($categories, true);
		}}
	/>
	<CalendarBody
		{weekStart}
		on:edit={(e) => {
			openModal();
			targetDate = e.detail.targetDate;
			editingEvent = convertToEventIn(e.detail.event);
		}}
		on:create={(e) => {
			openModal();
			editingEvent = buildEventWithTime($categories, e.detail.date, e.detail.timeInterval);
		}}
		on:move={async (e) => {
			if ($draggedEvent) {
				const event = moveEvent($draggedEvent, e.detail.date, e.detail.timeInterval);
				const events = await preserveEvent(event);
				updateTasks(events);
			}
		}}
	/>
	<Modal show={$isModalVisible} on:close={() => closeModal()}>
		<TaskForm {form} task={editingEvent} {targetDate} isOnlyEvent />
	</Modal>
</div>
