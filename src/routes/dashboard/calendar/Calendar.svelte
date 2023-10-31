<script lang="ts">
	import type { CCategory } from '$lib/category/utils';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { startOfWeek } from 'date-fns';

	import type { ActionData } from '../../../../.svelte-kit/types/src/routes/dashboard/$types';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import EventForm from './event-form/EventForm.svelte';
	import { buildEmptyEventIn, buildEventWithTime, convertToEventIn } from './service';
	import type { EventIn } from './service';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	let showForm: boolean = false;

	export let categories: CCategory[];

	export let form: ActionData | null;

	let event: EventIn = buildEmptyEventIn(categories);
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader
		bind:weekStart
		{currentDate}
		on:create={() => {
			showForm = true;
			event = buildEmptyEventIn(categories);
		}}
	/>
	<CalendarBody
		{weekStart}
		on:edit={(e) => {
			showForm = true;
			event = convertToEventIn(e.detail);
		}}
		on:create={(e) => {
			showForm = true;
			event = buildEventWithTime(categories, e.detail.date, e.detail.timeInterval);
		}}
	/>
	<Modal show={showForm} on:close={() => (showForm = false)}>
		<EventForm on:submit={() => (showForm = false)} {form} {event} {categories} />
	</Modal>
</div>
