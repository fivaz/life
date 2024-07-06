<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { arrangeEvents } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/placement-service';
	import ToDosPanel from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/to-dos-panel/ToDosPanel.svelte';
	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';

	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { GRID_CELL_HEIGHT } from './calendar-grid/service';
	import EventPanel from './event-panel/EventPanel.svelte';
	import { getEvents, getToDos } from './service';

	export let tasks: AnyTask[];

	export let date: Date;

	$: formattedDate = format(date, DATE);

	$: toDos = getToDos(tasks, date);

	$: events = getEvents(tasks, date);

	$: arrangedEvents = arrangeEvents(events);
</script>

<div>
	<div class="border-b" style="height: {GRID_CELL_HEIGHT}px">
		<ToDosPanel on:editTask on:persistToDos {toDos} />
	</div>
	<div class="relative">
		<CalendarGrid on:click targetDate={formattedDate} />
		{#each arrangedEvents as arrangedEvent (arrangedEvent)}
			<EventPanel
				css={arrangedEvent.css}
				event={arrangedEvent.event}
				on:editTask
				on:moveEvent
				on:toggleEvent
				targetDate={formattedDate}
			/>
		{/each}
	</div>
</div>
