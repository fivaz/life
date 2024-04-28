<script lang="ts">
	import type { AnyTask, ToDo } from '$lib/task/utils';

	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';

	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { NEW_GRID_CELL_HEIGHT } from './calendar-grid/service';
	import DueToDos from './due-to-dos/DueToDos.svelte';
	import EventPanel from './event-panel/EventPanel.svelte';
	import { getEvents, getTimeSlots, isToDoOnDay } from './service';

	export let tasks: AnyTask[];

	export let date: Date;

	$: formattedDate = format(date, DATE);

	$: toDos = tasks.filter((task): task is ToDo => isToDoOnDay(task, date));
</script>

<div>
	<div class="border-b" style="height: {NEW_GRID_CELL_HEIGHT}px">
		<DueToDos on:editTask {toDos} />
	</div>
	<div class="relative">
		<CalendarGrid on:click targetDate={formattedDate} />
		{#each getEvents(tasks, date) as event (event)}
			<EventPanel
				{event}
				on:editTask
				on:moveEvent
				on:toggleEvent
				targetDate={formattedDate}
				timeSlots={getTimeSlots(tasks, date)}
			/>
		{/each}
	</div>
</div>
