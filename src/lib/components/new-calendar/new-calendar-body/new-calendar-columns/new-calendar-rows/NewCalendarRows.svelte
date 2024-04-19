<script lang="ts">
	import type { AnyEvent, AnyTask, ToDo } from '$lib/task/utils';

	import NewCalendarGrid from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-calendar-grid/NewCalendarGrid.svelte';
	import NewEventPanel from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-event-panel/NewEventPanel.svelte';
	import { NEW_GRID_CELL_HEIGHT } from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-event-panel/service';
	import NewDueToDos from '$lib/components/new-due-to-dos/NewDueToDos.svelte';
	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';
	import { SignedIn } from 'sveltefire';

	import {
		isEventOnDay,
		isToDoOnDay,
	} from '../../../../../../routes/dashboard/home/calendar/calendar-body/calendar-columns/service';

	export let tasks: AnyTask[];
	export let date: Date;

	$: formattedDate = format(date, DATE);

	$: toDos = tasks.filter((task): task is ToDo => isToDoOnDay(task, date));

	$: events = tasks.filter((task): task is AnyEvent => isEventOnDay(task, date));
</script>

<SignedIn let:user>
	<div class="flex-grow">
		<div class="border-b" style="height: {NEW_GRID_CELL_HEIGHT}px">
			<NewDueToDos {toDos} />
		</div>
		<div class="relative">
			<NewCalendarGrid on:create targetDate={formattedDate} />
			{#each events as event (event)}
				<NewEventPanel {event} on:edit targetDate={formattedDate} userId={user.uid} />
			{/each}
		</div>
	</div>
</SignedIn>
