<script lang="ts">
	import EventForm from '$lib/components/calendar/calendar-header/event-form/EventForm.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { startOfWeek } from 'date-fns';

	import type { ActionData } from '../../../../.svelte-kit/types/src/routes/$types';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	let showForm: boolean = false;

	export let form: ActionData | null = null;
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader bind:weekStart {currentDate} on:create={() => (showForm = true)} />
	<CalendarBody
		{weekStart}
		{currentDate}
		on:edit={(event) => {
			showForm = true;
			form = {
				save: true,
				data: event.detail
			};
		}}
	/>
	<Modal show={showForm} on:close={() => (showForm = false)}>
		<EventForm on:submit={() => (showForm = false)} {form} />
	</Modal>
</div>
