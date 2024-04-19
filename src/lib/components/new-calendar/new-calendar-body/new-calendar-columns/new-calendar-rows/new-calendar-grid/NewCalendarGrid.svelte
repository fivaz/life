<script lang="ts">
	import NewGridCell from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-calendar-grid/new-grid-cell/NewGridCell.svelte';
	import { NEW_GRID_CELL_HEIGHT } from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-event-panel/service';
	import { clsx } from 'clsx';

	import { isSomethingDragging } from './service';

	const interval = 24 * 2;

	export let targetDate: string;
</script>

<div class="h-full">
	{#each Array.from({ length: interval }, (_, i) => i * 2) as quarterHour (quarterHour)}
		<div style="height: {NEW_GRID_CELL_HEIGHT * 2}px">
			<NewGridCell
				class={clsx('h-1/2', { 'border-b': $isSomethingDragging })}
				on:create
				{quarterHour}
				{targetDate}
			/>
			<NewGridCell class="h-1/2 border-b" on:create quarterHour={quarterHour + 1} {targetDate} />
		</div>
	{/each}
</div>
