<script lang="ts">
	import EventForm from '$lib/components/calendar/event-form/EventForm.svelte';
	import { buildEvent } from '$lib/components/calendar/event-form/service';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { startOfWeek } from 'date-fns';

	import type { ActionData } from '../../../../.svelte-kit/types/src/routes/$types';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	let showForm: boolean = false;

	export let form: ActionData | null;
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader bind:weekStart {currentDate} on:create={() => (showForm = true)} />
	<CalendarBody
		{weekStart}
		{currentDate}
		on:edit={(e) => {
			showForm = true;
			form = {
				save: true,
				data: e.detail
			};
		}}
		on:create={(e) => {
			showForm = true;
			form = {
				save: true,
				data: buildEvent(e.detail.date, e.detail.timeInterval)
			};
		}}
	/>
	<Modal show={showForm} on:close={() => (showForm = false)}>
		<EventForm on:submit={() => (showForm = false)} {form} />
	</Modal>
</div>
