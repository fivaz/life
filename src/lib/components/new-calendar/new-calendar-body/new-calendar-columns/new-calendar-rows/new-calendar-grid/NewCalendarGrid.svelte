<script lang="ts">
	import { clsx } from 'clsx';

	import { NEW_GRID_CELL_HEIGHT, isSomethingDragging } from '../new-event-panel/service';
	import NewGridCell from './new-grid-cell/NewGridCell.svelte';

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
