<script lang="ts">
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	import { GRID_CLASS, NEW_GRID_CELL_HEIGHT, isSomethingDragging } from '../service';

	const dispatch = createEventDispatcher<{ click: number; move: number }>();

	let className = '';
	export { className as class };
	export let cellNumber: number;
	export let targetDate: string;

	// TODO check if I can make this useless
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
	on:click={() => !$isSomethingDragging && dispatch('click', cellNumber)}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('click', cellNumber);
		}
	}}
	role="button"
	style="height: {NEW_GRID_CELL_HEIGHT}px"
	tabindex="0"
/>

<style>
	.grid-class:nth-child(even):not(:last-child) {
		border-bottom-width: 1px;
	}
</style>
