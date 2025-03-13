<script lang="ts">
	import { convertMinutesToTime, formatDate, formatTime, roundTo15 } from '@life/shared/date';

	import { currentDate } from '$lib/service.svelte.js';

	import { GRID_CELL_HEIGHT, GRID_CLASS, isSomethingDragging } from '../service.svelte.js';

	interface Props {
		class?: string;
		cellNumber: number;
		targetDate: string;
		create: (time: string) => void;
	}

	let { class: klass, cellNumber, targetDate, create }: Props = $props();

	let time = $derived(convertMinutesToTime(cellNumber * 15));

	let isSameTime = $derived.by(() => {
		const roundedDate = roundTo15(currentDate.value);

		const currentDateValue = formatDate(roundedDate);

		const currentTime = formatTime(roundedDate);

		return currentTime === time && currentDateValue === targetDate;
	});
</script>

<!--the class grid-cell is used in EventPanel to control droppable zones for its drag and drop-->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	style="height: {GRID_CELL_HEIGHT}px"
	class="{GRID_CLASS} {klass}
		border-gray-200 even:border-b dark:border-gray-800
		{isSameTime ? 'rounded-md border border-dashed border-violet-500' : ''}"
	class:border-b={isSomethingDragging.value}
	data-date={targetDate}
	data-time={time}
	onclick={() => !isSomethingDragging.value && create(time)}
></div>
