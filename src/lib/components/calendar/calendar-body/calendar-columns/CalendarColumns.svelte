<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import {
		GRID_CELL_TIME,
		NUMBER_OF_CELLS,
	} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import { setHours, setMinutes } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import CalendarRows from './calendar-rows/CalendarRows.svelte';

	export let dates: Date[];
	export let tasks: AnyTask[];

	export let selectedDate: Date;

	const dispatch = createEventDispatcher<{
		createTask: Date;
		move: { cellNumber: number; date: Date };
	}>();

	export function buildDate(date: Date, cellNumber: number): Date {
		if (cellNumber < 0 || cellNumber > NUMBER_OF_CELLS) {
			throw 'Invalid number. Please enter a number between 0 and 95.';
		}

		return setMinutes(setHours(date, 0), cellNumber * GRID_CELL_TIME);
	}
</script>

<div class="hidden grow md:flex">
	<div class="grid w-full grid-cols-7 divide-x border-x">
		{#each dates as date (date)}
			<CalendarRows
				{date}
				on:click={(e) => dispatch('createTask', buildDate(date, e.detail))}
				on:editTask
				on:moveEvent
				on:toggleEvent
				{tasks}
			/>
		{/each}
	</div>
	<div class="w-8" />
</div>

<div class="block grow md:hidden">
	<CalendarRows
		date={selectedDate}
		on:click={(e) => dispatch('createTask', buildDate(selectedDate, e.detail))}
		on:editTask
		on:moveEvent
		on:toggleEvent
		{tasks}
	/>
</div>
