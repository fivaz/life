<script lang="ts">
	import TasksSummary from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/tasks-summary/TasksSummary.svelte';
	import { tasks } from '$lib/components/calendar/service';
	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';

	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { SUMMARY_GRID_CELL_HEIGHT } from './calendar-grid/service';
	import EventPanel from './event-panel/EventPanel.svelte';
	import { getEventGrid, getEvents, getToDos } from './service';

	interface Props {
		date: Date;
		create: (time: string) => void;
	}

	let { date, create }: Props = $props();

	let formattedDate = $derived(format(date, DATE));

	let toDos = $derived(getToDos($tasks, date));

	let events = $derived(getEvents($tasks, date));

	let eventsGrid = $derived(getEventGrid(events));
</script>

<div>
	<div class="border-b" style="height: {SUMMARY_GRID_CELL_HEIGHT}px">
		<TasksSummary tasks={[...toDos, ...events]} />
	</div>
	<div class="relative">
		<CalendarGrid {create} targetDate={formattedDate} />
		{#each events as event (event)}
			<EventPanel {event} {eventsGrid} targetDate={formattedDate} />
		{/each}
	</div>
</div>
