<script lang="ts">
	import type { CCategory } from '$lib/category/utils';
	import { groups } from '$lib/category/utils';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { EEvent } from '$lib/event/utils';
	import { setHours, setMinutes, startOfWeek } from 'date-fns';

	import type { ActionData } from '../../../../.svelte-kit/types/src/routes/dashboard/$types';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import EventForm from './event-form/EventForm.svelte';

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);

	let showForm: boolean = false;

	export let categories: CCategory[];

	export let form: ActionData | null;

	function buildDate(date: Date, timeInterval: number) {
		if (timeInterval < 0 || timeInterval > 48) {
			throw 'Invalid number. Please enter a number between 0 and 48.';
		}

		return setMinutes(setHours(date, 0), timeInterval * 30);
	}

	function buildDefaultEvent(date: Date, timeInterval: number): EEvent {
		return {
			id: 0,
			name: '',
			description: null,
			startDate: buildDate(date, timeInterval),
			endDate: buildDate(date, timeInterval + 0.5),
			isDone: false,
			categoryId: 0,
			category: {
				id: 0,
				name: '',
				isDefault: false,
				color: '',
				group: groups[0],
			},
		};
	}
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader
		bind:weekStart
		{currentDate}
		on:create={() => {
			showForm = true;
			form = null;
		}}
	/>
	<CalendarBody
		{weekStart}
		on:edit={(e) => {
			showForm = true;
			form = {
				saved: e.detail,
			};
		}}
		on:create={(e) => {
			showForm = true;
			form = {
				saved: buildDefaultEvent(e.detail.date, e.detail.timeInterval),
			};
		}}
	/>
	<Modal show={showForm} on:close={() => (showForm = false)}>
		<EventForm on:submit={() => (showForm = false)} {form} {categories} />
	</Modal>
</div>
