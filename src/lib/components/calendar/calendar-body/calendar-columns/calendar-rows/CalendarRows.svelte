<script lang="ts">
	import TasksSummary from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/tasks-summary/TasksSummary.svelte';
	import { tasks } from '$lib/components/calendar/service';
	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';

	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { SUMMARY_GRID_CELL_HEIGHT } from './calendar-grid/service';
	import EventPanel from './event-panel/EventPanel.svelte';
	import { getEventGrid, getEvents, getToDos } from './service';

	export let date: Date;

	$: formattedDate = format(date, DATE);

	$: toDos = getToDos($tasks, date);

	$: events = getEvents($tasks, date);

	$: eventsGrid = getEventGrid(events);
</script>

<div>
	<div class="border-b" style="height: {SUMMARY_GRID_CELL_HEIGHT}px">
		<TasksSummary on:editTask on:persistToDos tasks={[...toDos, ...events]} />
	</div>
	<div class="relative">
		<CalendarGrid on:click targetDate={formattedDate} />
		{#each events as event (event)}
			<EventPanel {event} {eventsGrid} on:moveEvent on:toggleEvent targetDate={formattedDate} />
		{/each}
	</div>
</div>
