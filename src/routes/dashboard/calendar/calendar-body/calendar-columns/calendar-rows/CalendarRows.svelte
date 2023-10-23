<script lang="ts">
	import { events } from '$lib/event/store';
	import { createEventDispatcher } from 'svelte';
	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import Event from './event/Event.svelte';
	import { halfHourInterval, isEventOnDay, getGridRowsStyle } from './service';

	export let date: Date;

	$: dayEvents = $events.filter((event) => isEventOnDay(event, date));

	const quarterHourInterval = halfHourInterval * 2;

	const dispatch = createEventDispatcher<{
		create: { timeInterval: number; date: Date };
	}>();
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
		{#each dayEvents as event (event)}
			<!--then we set each element of the list with pointer-events-auto so they can catch events to edit the TEvent-->
			<li
				class="relative w-full h-full rounded-lg pointer-events-auto"
				style={getGridRowsStyle(event)}
			>
				<Event {event} on:edit />
			</li>
		{/each}
	</ol>
</div>
