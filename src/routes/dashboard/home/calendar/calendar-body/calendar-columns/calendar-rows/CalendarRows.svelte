<script lang="ts">
	import type { AnyEvent } from '$lib/task/utils';

	import { SignedIn } from 'sveltefire';

	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { GRID_CELL_HEIGHT } from './calendar-grid/service';
	import EventPanel from './event-panel/EventPanel.svelte';
	import { halfHourInterval } from './service';

	export let events: AnyEvent[];

	export let targetDate: string;

	const quarterHourInterval = halfHourInterval * 2;
</script>

<!--TODO make top and side sticky-->
<!--TODO handle tasks that takes more than 1 day-->

<div class="relative h-full w-full">
	<CalendarGrid on:create {targetDate} />
	<!--pointer-events-none will make the list container of events incapable of catching point events-->
	<!--so we can catch the events emit by CalendarGrid behind it-->
	<div
		class="pointer-events-none absolute inset-0 grid"
		style="grid-template-rows: repeat({quarterHourInterval}, minmax({GRID_CELL_HEIGHT}px, 1fr)) auto"
	>
		<SignedIn let:user>
			{#each events as event (event)}
				<!--then we set each element of the list with pointer-events-auto so they can catch events to edit the TEvent-->
				<!--the min-w-0 is necessary due to a issue with truncate text in a grid layout see: https://dev.to/timhecker/grid-cell-issue-with-white-space-nowrap--text-overflow-ellipsis-52g6-->

				<EventPanel {event} on:edit {targetDate} userId={user.uid} />
			{/each}
		</SignedIn>
	</div>
</div>
