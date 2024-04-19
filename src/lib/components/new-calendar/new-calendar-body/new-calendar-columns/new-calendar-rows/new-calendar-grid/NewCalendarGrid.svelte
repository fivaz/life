<script lang="ts">
	import { NEW_GRID_CELL_HEIGHT } from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-event-panel/service';

	const interval = 24 * 2;
</script>

<div class="h-full">
	{#each Array.from({ length: interval }, (_, i) => i) as quarterHour (quarterHour)}
		<div style="height: {NEW_GRID_CELL_HEIGHT}px" />
		<div class="border-b" style="height: {NEW_GRID_CELL_HEIGHT}px"></div>
	{/each}
</div>
