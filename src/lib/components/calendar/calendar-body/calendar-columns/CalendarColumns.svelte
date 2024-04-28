<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { buildDate } from '$lib/task/time-utils';
	import { createEventDispatcher } from 'svelte';

	import CalendarRows from './calendar-rows/CalendarRows.svelte';

	export let dates: Date[];
	export let tasks: AnyTask[];

	export let selectedDate: Date;

	const dispatch = createEventDispatcher<{
		createTask: Date;
		move: { cellNumber: number; date: Date };
	}>();
</script>

<div class="hidden grow md:flex">
	<div class="grid w-full grid-cols-7 divide-x border-x">
		{#each dates as date (date)}
			<CalendarRows
				{date}
				on:click={(e) => dispatch('createTask', buildDate(date, e.detail))}
				on:editTask
				on:moveEvent
				on:toggleEvent
				{tasks}
			/>
		{/each}
	</div>
	<div class="w-8" />
</div>

<div class="block grow md:hidden">
	<CalendarRows
		date={selectedDate}
		on:click={(e) => dispatch('createTask', buildDate(selectedDate, e.detail))}
		on:editTask
		on:moveEvent
		on:toggleEvent
		{tasks}
	/>
</div>
