<script lang="ts">
	import { dates, selectedDate } from '$lib/components/calendar/service';
	import { buildDate } from '$lib/task/time-utils';
	import { getContext } from 'svelte';

	import CalendarRows from './calendar-rows/CalendarRows.svelte';

	const createTask = getContext('createTask');
</script>

<div class="hidden grow md:flex">
	<div class="grid w-full grid-cols-7 divide-x border-x">
		{#each $dates as date (date)}
			<CalendarRows {date} create={(time) => createTask(buildDate(date, time))} />
		{/each}
	</div>
	<div class="w-8"></div>
</div>

<div class="mb-5 block grow border border-b md:hidden">
	<CalendarRows
		date={$selectedDate}
		create={(time) => createTask(buildDate($selectedDate, time))}
	/>
</div>
