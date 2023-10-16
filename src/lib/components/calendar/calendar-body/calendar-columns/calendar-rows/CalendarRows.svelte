<script lang="ts">
	import type { TEvent } from '$lib';
	import { events } from '$lib/store/events';
	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import Event from './event/Event.svelte';
	import { halfHourInterval, isEventOnDay, getGridRows } from './service';

	export let date: Date;

	let eventsData: (TEvent & { gridRowStart: number; gridRowEnd: number })[] = [];

	$: eventsData = $events
		.filter((event) => isEventOnDay(event, date))
		.map((event) => ({
			...event,
			...getGridRows(event)
		}));

	const quarterHourInterval = halfHourInterval * 2;
</script>

<!--TODO make top and side sticky-->
<!--TODO handle event that takes more than 1 day-->

<div class="relative h-full">
	<CalendarGrid />
	<ol
		class="h-full absolute top-0 w-full grid"
		style="grid-template-rows: repeat({quarterHourInterval}, minmax(1.75rem, 1fr)) auto"
	>
		{#each eventsData as event (event)}
			<li
				class="w-full h-full rounded-lg"
				style="grid-row: {event.gridRowStart} / {event.gridRowEnd};"
			>
				<Event {event} on:edit />
			</li>
		{/each}
	</ol>
</div>
