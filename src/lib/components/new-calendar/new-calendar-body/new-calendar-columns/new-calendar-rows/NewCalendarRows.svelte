<script lang="ts">
	import type { AnyEvent } from '$lib/task/utils';

	import NewCalendarGrid from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-calendar-grid/NewCalendarGrid.svelte';
	import NewEventPanel from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-event-panel/NewEventPanel.svelte';

	export let events: AnyEvent[];
</script>

<div class="">
	<div class="h-7 border-b"></div>
	<div class="relative">
		<NewCalendarGrid></NewCalendarGrid>
		{#each events as event (event)}
			<NewEventPanel {event}></NewEventPanel>
		{/each}
	</div>
</div>
