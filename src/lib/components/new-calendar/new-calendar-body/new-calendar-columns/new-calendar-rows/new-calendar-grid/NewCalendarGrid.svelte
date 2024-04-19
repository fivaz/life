<script lang="ts">
	import { clsx } from 'clsx';

	import NewGridCell from './new-grid-cell/NewGridCell.svelte';
	import { GRID_CELL_TIME } from './service';

	export let targetDate: string;

	const NUMBER_OF_CELLS = (24 * 60) / GRID_CELL_TIME;
</script>

<div class="h-full">
	{#each Array.from({ length: NUMBER_OF_CELLS }, (_, i) => i) as cellNumber (cellNumber)}
		<NewGridCell {cellNumber} class={clsx('h-1/2')} on:create {targetDate} />
	{/each}
</div>
