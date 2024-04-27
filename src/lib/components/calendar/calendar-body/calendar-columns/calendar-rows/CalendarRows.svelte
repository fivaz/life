<script lang="ts">
	import type { AnyEvent, AnyTask, ToDo } from '$lib/task/utils';

	import {
		getEndSlot,
		getStartSlot,
	} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/placement-service';
	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';
	import { SignedIn } from 'sveltefire';

	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { NEW_GRID_CELL_HEIGHT } from './calendar-grid/service';
	import DueToDos from './due-to-dos/DueToDos.svelte';
	import EventPanel from './event-panel/EventPanel.svelte';
	import { isEventOnDay, isToDoOnDay } from './service';

	export let tasks: AnyTask[];
	export let date: Date;

	$: formattedDate = format(date, DATE);

	$: toDos = tasks.filter((task): task is ToDo => isToDoOnDay(task, date));

	function getEvents(tasks: AnyTask[], date: Date) {
		return tasks.filter((task): task is AnyEvent => isEventOnDay(task, date));
	}

	function getTimeSlots(tasks: AnyTask[], date: Date): string[][] {
		const timeSlots = new Array(96).fill(null).map<string[]>(() => []);

		const events = getEvents(tasks, date);

		for (let event of events) {
			const startSlot = getStartSlot(event);
			const endSlot = getEndSlot(event);
			for (let i = startSlot; i < endSlot; i++) {
				timeSlots[i].push(event.id);
			}
		}

		return timeSlots;
	}
</script>

<SignedIn let:user>
	<div>
		<div class="border-b" style="height: {NEW_GRID_CELL_HEIGHT}px">
			<DueToDos {toDos} />
		</div>
		<div class="relative">
			<CalendarGrid on:create targetDate={formattedDate} />
			{#each getEvents(tasks, date) as event (event)}
				<EventPanel
					{event}
					on:edit
					targetDate={formattedDate}
					timeSlots={getTimeSlots(tasks, date)}
					userId={user.uid}
				/>
			{/each}
		</div>
	</div>
</SignedIn>
