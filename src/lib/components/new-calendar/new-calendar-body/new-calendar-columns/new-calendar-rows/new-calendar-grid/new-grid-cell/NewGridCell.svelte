<script lang="ts">
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	import { GRID_CLASS, NEW_GRID_CELL_HEIGHT, isSomethingDragging } from '../service';

	const dispatch = createEventDispatcher<{ create: number; move: number }>();

	let className = '';
	export { className as class };
	export let cellNumber: number;
	export let targetDate: string;

	function getTime(cellNumber: number) {
		const totalMinutes = cellNumber * 15;

		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}
</script>

<!--the class grid-cell is used in EventPanel to control droppable zones for its drag and drop-->
<div
	class={clsx(GRID_CLASS, className, { 'border-b': $isSomethingDragging })}
	data-date={targetDate}
	data-time={getTime(cellNumber)}
	on:click={() => !$isSomethingDragging && dispatch('create', cellNumber)}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('create', cellNumber);
		}
	}}
	role="button"
	style="height: {NEW_GRID_CELL_HEIGHT}px"
	tabindex="0"
/>

<style>
	.grid-class:nth-child(even) {
		border-bottom-width: 1px;
	}
</style>
