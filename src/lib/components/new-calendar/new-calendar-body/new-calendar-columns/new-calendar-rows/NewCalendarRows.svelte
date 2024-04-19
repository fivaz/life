<script lang="ts">
	import type { AnyEvent } from '$lib/task/utils';

	import NewCalendarGrid from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-calendar-grid/NewCalendarGrid.svelte';
	import NewEventPanel from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-event-panel/NewEventPanel.svelte';
	import { NEW_GRID_CELL_HEIGHT } from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-event-panel/service';

	export let events: AnyEvent[];
</script>

<div class="flex-grow">
	<div class="border-b" style="height: {NEW_GRID_CELL_HEIGHT}px"></div>
	<div class="relative">
		<NewCalendarGrid></NewCalendarGrid>
		{#each events as event (event)}
			<NewEventPanel {event} on:edit on:toggle />
		{/each}
	</div>
</div>
