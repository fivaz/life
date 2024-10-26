<script lang="ts">
	import { convertMinutesToTime } from '$lib/task/time-utils';
	import { clsx } from 'clsx';

	import { GRID_CELL_HEIGHT, GRID_CLASS, isSomethingDragging } from '../service';

	interface Props {
		class?: string;
		cellNumber: number;
		targetDate: string;
		create: (time: string) => void;
	}

	let { class: klass, cellNumber, targetDate, create }: Props = $props();

	let time = $derived(convertMinutesToTime(cellNumber * 15));
</script>

<!--the class grid-cell is used in EventPanel to control droppable zones for its drag and drop-->
<div
	class={clsx(GRID_CLASS, klass, { 'border-b': $isSomethingDragging })}
	data-date={targetDate}
	data-time={time}
	onclick={() => !$isSomethingDragging && create(time)}
	onkeydown={(e) => {
		if (e.key === 'Enter') {
			create(time);
		}
	}}
	role="button"
	style="height: {GRID_CELL_HEIGHT}px"
	tabindex="0"
></div>

<style>
	.grid-class:nth-child(even):not(:last-child) {
		border-bottom-width: 1px;
	}
</style>
