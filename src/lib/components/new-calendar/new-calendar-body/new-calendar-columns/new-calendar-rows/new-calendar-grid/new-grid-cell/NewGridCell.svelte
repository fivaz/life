<script lang="ts">
	import { isSomethingDragging } from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-calendar-grid/service';
	import { GRID_CLASS } from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-event-panel/service';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ create: number; move: number }>();

	let className = '';
	export { className as class };
	export let quarterHour: number;
	export let targetDate: string;

	function getTime(quarterHour: number) {
		const totalMinutes = quarterHour * 15;

		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}
</script>

<!--the class grid-cell is used in EventPanel to control droppable zones for its drag and drop-->
<div
	class={clsx(GRID_CLASS, className)}
	data-date={targetDate}
	data-time={getTime(quarterHour)}
	on:click={() => !$isSomethingDragging && dispatch('create', quarterHour)}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('create', quarterHour);
		}
	}}
	role="button"
	tabindex="0"
/>
