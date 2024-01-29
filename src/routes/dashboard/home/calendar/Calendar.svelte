<script lang="ts">
	import { categories } from '$lib/category/store';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { TaskIn } from '$lib/components/task-form/service';
	import { buildEmptyTaskIn, convertToTaskIn, modalId } from '$lib/components/task-form/service';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { draggedEvent } from '$lib/dragged/store';
	import { closeModal, modalMap, openModal } from '$lib/form-modal/store';
	import { updateTasks } from '$lib/task/store';
	import { startOfWeek } from 'date-fns';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import { buildEventWithTime, moveEvent, preserveEvent } from './service';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	let targetDate: Date | null = null;

	let editingEvent: TaskIn = buildEmptyTaskIn($categories, null, true);
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader
		bind:weekStart
		{currentDate}
		on:create={() => {
			openModal(modalId);
			editingEvent = buildEmptyTaskIn($categories, null, true);
		}}
	/>
	<CalendarBody
		{weekStart}
		on:edit={(e) => {
			openModal(modalId);
			targetDate = e.detail.targetDate;
			editingEvent = convertToTaskIn(e.detail.event);
		}}
		on:create={(e) => {
			openModal(modalId);
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
	<Modal show={!!$modalMap.get(modalId)} on:close={() => closeModal(modalId)}>
		<TaskForm task={editingEvent} {targetDate} />
	</Modal>
</div>
