<script lang="ts">
	import { clsx } from 'clsx';

	import { currentDate, formatDate, formatTime } from '$lib/date.utils.svelte';
	import { convertMinutesToTime } from '$lib/task/time-utils';

	import { GRID_CELL_HEIGHT, GRID_CLASS, isSomethingDragging } from '../service.svelte';

	interface Props {
		class?: string;
		cellNumber: number;
		targetDate: string;
		create: (time: string) => void;
	}

	let { class: klass, cellNumber, targetDate, create }: Props = $props();

	let time = $derived(convertMinutesToTime(cellNumber * 15));

	let isSameTime = $derived.by(() => {
		const currentDateValue = formatDate(currentDate.value);
		const currentTime = formatTime(currentDate.value);
		return currentTime === time && currentDateValue === targetDate;
	});
</script>

<!--the class grid-cell is used in EventPanel to control droppable zones for its drag and drop-->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	style="height: {GRID_CELL_HEIGHT}px"
	class={clsx(GRID_CLASS, klass, {
		'border-b': isSomethingDragging.value,
		'rounded-md border border-dashed border-violet-500': isSameTime,
	})}
	data-date={targetDate}
	data-time={time}
	onclick={() => !isSomethingDragging.value && create(time)}
></div>

<style>
	.grid-class:nth-child(even):not(:last-child) {
		border-bottom-width: 1px;
	}
</style>
