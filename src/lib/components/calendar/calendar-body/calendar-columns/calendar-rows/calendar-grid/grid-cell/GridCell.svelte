<script lang="ts">
	import { convertMinutesToTime } from '$lib/task/time-utils';
	import { clsx } from 'clsx';

	import { GRID_CELL_HEIGHT, GRID_CLASS, isSomethingDragging } from '../service.svelte';
	import { currentDate } from '$lib/components/calendar/service.svelte';
	import { DATE, TIME } from '$lib/consts';
	import { format } from 'date-fns';

	interface Props {
		class?: string;
		cellNumber: number;
		targetDate: string;
		create: (time: string) => void;
	}

	let { class: klass, cellNumber, targetDate, create }: Props = $props();

	let time = $derived(convertMinutesToTime(cellNumber * 15));

	let isSameTime = $derived.by(() => {
		const currentDateValue = format(currentDate.value, DATE);
		const currentTime = format(currentDate.value, TIME);
		return currentTime === time && currentDateValue === targetDate;
	});
</script>

<!--the class grid-cell is used in EventPanel to control droppable zones for its drag and drop-->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={clsx(GRID_CLASS, klass, {
		'border-b': isSomethingDragging.value,
		'rounded-md border border-dashed border-violet-500': isSameTime,
	})}
	data-date={targetDate}
	data-time={time}
	onclick={() => !isSomethingDragging.value && create(time)}
	style="height: {GRID_CELL_HEIGHT}px"
></div>

<style>
	.grid-class:nth-child(even):not(:last-child) {
		border-bottom-width: 1px;
	}
</style>
