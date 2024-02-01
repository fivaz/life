<script lang="ts">
	import type { TaskIn } from '$lib/components/task-form/service';
	import { buildEmptyTaskIn, convertToTaskIn } from '$lib/components/task-form/service';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { draggedEvent } from '$lib/dragged/store';
	import { updateTasks } from '$lib/task/store';
	import { startOfWeek } from 'date-fns';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import { buildEventWithTime, moveEvent, preserveEvent } from './service';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	let targetDate: Date | null = null;

	let editingEvent: TaskIn = buildEmptyTaskIn([], null, true);

	let showForm = false;
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader
		bind:weekStart
		{currentDate}
		on:create={() => {
			showForm = true;
			editingEvent = buildEmptyTaskIn([], null, true);
		}}
	/>
	<CalendarBody
		{weekStart}
		on:edit={(e) => {
			showForm = true;
			targetDate = e.detail.targetDate;
			editingEvent = convertToTaskIn(e.detail.event);
		}}
		on:create={(e) => {
			showForm = true;
			editingEvent = buildEventWithTime([], e.detail.date, e.detail.timeInterval);
		}}
		on:move={async (e) => {
			if ($draggedEvent) {
				const event = moveEvent($draggedEvent, e.detail.date, e.detail.timeInterval);
				const events = await preserveEvent(event);
				updateTasks(events);
			}
		}}
	/>
	<TaskForm show={showForm} task={editingEvent} {targetDate} on:close={() => (showForm = false)} />
</div>
