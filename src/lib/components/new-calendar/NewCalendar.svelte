<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import type { AnyEvent } from '$lib/task/utils';

	import Modal from '$lib/components/modal/Modal.svelte';
	import NewCalendarBody from '$lib/components/new-calendar/new-calendar-body/NewCalendarBody.svelte';
	import NewCalendarHeader from '$lib/components/new-calendar/new-calendar-header/NewCalendarHeader.svelte';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
	import { startOfWeek } from 'date-fns';

	import {
		buildEmptyEvent,
		buildEventWithTime,
	} from '../../../routes/dashboard/home/calendar/service';

	export let categories: Category[];
	export let events: AnyEvent[];

	let targetDate: string | undefined = undefined;

	let weekStart = startOfWeek(new Date());

	let showForm = false;

	let editingEvent: AnyEvent = buildEmptyEvent([]);
</script>

<div class="flex h-full flex-col">
	<NewCalendarHeader
		bind:weekStart
		on:create={() => {
			showForm = true;
			editingEvent = buildEmptyEvent(categories);
		}}
	/>
	<NewCalendarBody
		{events}
		on:create={(e) => {
			showForm = true;
			editingEvent = buildEventWithTime(categories, e.detail.date, e.detail.timeInterval);
		}}
		on:edit={(e) => {
			showForm = true;
			targetDate = e.detail.targetDate;
			editingEvent = e.detail.event;
		}}
		{weekStart}
	/>
	<Modal on:close={() => (showForm = false)} show={showForm}>
		<TaskForm
			{categories}
			on:close={() => (showForm = false)}
			{targetDate}
			task={editingEvent}
			userId={'0'}
		/>
	</Modal>
</div>
