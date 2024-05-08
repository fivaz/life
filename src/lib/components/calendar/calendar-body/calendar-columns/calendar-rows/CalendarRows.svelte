<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';

	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { NEW_GRID_CELL_HEIGHT } from './calendar-grid/service';
	import DueToDos from './due-to-dos/DueToDos.svelte';
	import EventPanel from './event-panel/EventPanel.svelte';
	import { getEvents, getTimeSlots, getToDos } from './service';

	export let tasks: AnyTask[];

	export let date: Date;

	$: formattedDate = format(date, DATE);

	$: toDos = getToDos(tasks, date);

	$: events = getEvents(tasks, date);

	$: timeSlots = getTimeSlots(events);
</script>

<div>
	<div class="border-b" style="height: {NEW_GRID_CELL_HEIGHT}px">
		<DueToDos on:editTask {toDos} />
	</div>
	<div class="relative">
		<CalendarGrid on:click targetDate={formattedDate} />
		{#each events as event (event)}
			<EventPanel
				{event}
				on:editTask
				on:moveEvent
				on:toggleEvent
				targetDate={formattedDate}
				{timeSlots}
			/>
		{/each}
	</div>
</div>
