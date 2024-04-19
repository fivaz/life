<script lang="ts">
	import type { AnyEvent, AnyTask, ToDo } from '$lib/task/utils';

	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';
	import { SignedIn } from 'sveltefire';

	import NewCalendarGrid from './new-calendar-grid/NewCalendarGrid.svelte';
	import NewDueToDos from './new-due-to-dos/NewDueToDos.svelte';
	import NewEventPanel from './new-event-panel/NewEventPanel.svelte';
	import { NEW_GRID_CELL_HEIGHT } from './new-event-panel/service';
	import { isEventOnDay, isToDoOnDay } from './service';

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
