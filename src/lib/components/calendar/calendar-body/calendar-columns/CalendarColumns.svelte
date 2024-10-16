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
			<CalendarRows
				{date}
				on:click={(e) => createTask(buildDate(date, e.detail))}
				on:moveEvent
				on:persistToDos
				on:toggleEvent
			/>
		{/each}
	</div>
	<div class="w-8" />
</div>

<div class="mb-5 block grow border border-b md:hidden">
	<CalendarRows
		date={$selectedDate}
		on:click={(e) => createTask(buildDate($selectedDate, e.detail))}
		on:moveEvent
		on:persistToDos
		on:toggleEvent
	/>
</div>
