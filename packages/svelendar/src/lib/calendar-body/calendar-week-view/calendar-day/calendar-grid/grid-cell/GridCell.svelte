<script lang="ts">
	import { convertMinutesToTime, floorRound15, formatDate, formatTime } from '@life/shared/date';
	import { clsx } from 'clsx';

	import { currentDate } from '$lib/service.svelte.js';

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
		const roundedDate = floorRound15(currentDate.value);

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
	class={clsx(
		GRID_CLASS,
		klass,
		'relative divide-gray-200 border-gray-200 even:border-b dark:divide-gray-700 dark:border-gray-700',
	)}
	class:border-b={isSomethingDragging.value}
	data-date={targetDate}
	data-time={time}
	onclick={() => !isSomethingDragging.value && create(time)}
>
	{#if isSameTime}
		<div
			class="pointer-events-none absolute left-0 right-0 top-0 z-30 h-full rounded-md border-2 border-dashed border-indigo-600"
		></div>
	{/if}
</div>
