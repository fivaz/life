<script lang="ts">
	import { getContext } from 'svelte';

	import CalendarDay from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/CalendarDay.svelte';
	import { selectedDate, weekDays } from '$lib/components/calendar/service.svelte';
	import { buildDate } from '$lib/task/time-utils';
	import type { Task } from '$lib/task/utils';

	interface Props {
		tasks: Task[];
	}

	let { tasks }: Props = $props();

	const createTask = getContext('createTask');
</script>

<div class="hidden grow md:flex">
	<div class="grid w-full grid-cols-7 divide-x border-x">
		{#each weekDays.value as date (date)}
			<CalendarDay
				class="hidden md:flex"
				{date}
				{tasks}
				create={(time) => createTask(buildDate(date, time))}
			/>
		{/each}
	</div>
	<div class="w-8"></div>
</div>

<div class="mb-5 block grow border border-b md:hidden">
	<CalendarDay
		{tasks}
		class="block md:hidden"
		date={selectedDate.value}
		create={(time) => createTask(buildDate(selectedDate.value, time))}
	/>
</div>
