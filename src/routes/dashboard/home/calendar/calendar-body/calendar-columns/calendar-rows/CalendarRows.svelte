<script lang="ts">
	import type { EEvent } from '$lib/task/utils';
	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import Event from './event/Event.svelte';
	import { halfHourInterval, getGridRowsStyle } from './service';

	export let events: EEvent[];

	export let targetDate: Date;

	const quarterHourInterval = halfHourInterval * 2;
</script>

<!--TODO make top and side sticky-->
<!--TODO handle toDo that takes more than 1 day-->

<div class="relative w-full h-full">
	<CalendarGrid on:create on:move />
	<!--pointer-events-none will make the list container of events incapable of catching point events-->
	<!--so we can catch the events emit by CalendarGrid behind it-->
	<ol
		class="absolute inset-0 grid pointer-events-none"
		style="grid-template-rows: repeat({quarterHourInterval}, minmax(1.75rem, 1fr)) auto"
	>
		{#each events as event (event)}
			<!--then we set each element of the list with pointer-events-auto so they can catch events to edit the TEvent-->
			<!--the min-w-0 is necessary due to a issue with truncate text in a grid layout see: https://dev.to/timhecker/grid-cell-issue-with-white-space-nowrap--text-overflow-ellipsis-52g6-->
			<li
				class="relative w-full h-full rounded-lg pointer-events-auto min-w-0"
				style={getGridRowsStyle(event)}
			>
				<Event {targetDate} {event} on:edit />
			</li>
		{/each}
	</ol>
</div>
