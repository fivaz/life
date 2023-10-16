<script lang="ts">
	import type { TEvent } from '$lib';
	import { events } from '$lib/store/events';
	import { createEventDispatcher } from 'svelte';
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

	const dispatch = createEventDispatcher();
</script>

<!--TODO make top and side sticky-->
<!--TODO handle event that takes more than 1 day-->

<div class="relative h-full">
	<CalendarGrid on:create={(e) => dispatch('create', { timeInterval: e.detail, date })} />
	<!--pointer-events-none will make the list container of events incapable of catching point events-->
	<!--so we can catch the events emit by CalendarGrid behind it-->
	<ol
		class="h-full absolute top-0 w-full grid pointer-events-none"
		style="grid-template-rows: repeat({quarterHourInterval}, minmax(1.75rem, 1fr)) auto"
	>
		{#each eventsData as event (event)}
			<!--then we set each element of the list with pointer-events-auto so they can catch events to edit the TEvent-->
			<li
				class="w-full h-full rounded-lg pointer-events-auto"
				style="grid-row: {event.gridRowStart} / {event.gridRowEnd};"
			>
				<Event {event} on:edit />
			</li>
		{/each}
	</ol>
</div>
