<script lang="ts">
	import type { AnyEvent, AnyTask } from '$lib/task/utils';

	import NewCalendarRows from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/NewCalendarRows.svelte';

	import { isEventOnDay } from '../../../../../routes/dashboard/home/calendar/calendar-body/calendar-columns/service';

	export let dates: Date[];
	export let events: AnyEvent[];

	function getEvents(date: Date, tasks: AnyTask[]): Array<AnyEvent> {
		return tasks.filter((task): task is AnyEvent => isEventOnDay(task, date));
	}
</script>

<div class="grow flex">
	<div class="w-full grid grid-cols-7 border-x divide-x">
		{#each dates as date (date)}
			<NewCalendarRows events={getEvents(date, events)}></NewCalendarRows>
		{/each}
	</div>
	<div class="w-8" />
</div>
