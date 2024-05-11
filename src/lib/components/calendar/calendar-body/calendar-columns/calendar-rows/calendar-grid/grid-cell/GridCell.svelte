<script lang="ts">
	import { convertMinutesToTime } from '$lib/task/time-utils';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	import { GRID_CLASS, NEW_GRID_CELL_HEIGHT, isSomethingDragging } from '../service';

	const dispatch = createEventDispatcher<{ click: string; move: number }>();

	let className = '';
	export { className as class };
	export let cellNumber: number;
	export let targetDate: string;

	$: time = convertMinutesToTime(cellNumber * 15);
</script>

<!--the class grid-cell is used in EventPanel to control droppable zones for its drag and drop-->
<div
	class={clsx(GRID_CLASS, className, { 'border-b': $isSomethingDragging })}
	data-date={targetDate}
	data-time={time}
	on:click={() => !$isSomethingDragging && dispatch('click', time)}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('click', time);
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
