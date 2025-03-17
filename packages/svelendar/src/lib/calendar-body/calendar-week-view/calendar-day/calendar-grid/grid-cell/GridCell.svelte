<script lang="ts">
	import { borderColors } from '@life/shared/colors';
	import { convertMinutesToTime, floorRound15, formatDate, formatTime } from '@life/shared/date';
	import { clsx } from 'clsx';

	import { currentDate } from '$lib/service.svelte';

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
		isSameTime
			? 'rounded-md border border-dashed border-violet-500'
			: `even:border-b ${borderColors.light}`,
	)}
	class:border-b={isSomethingDragging.value}
	data-date={targetDate}
	data-time={time}
	onclick={() => !isSomethingDragging.value && create(time)}
></div>
