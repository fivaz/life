<script lang="ts">
	import CalendarDay from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/CalendarDay.svelte';
	import { getCreateTask } from '$lib/components/calendar/context.utils';
	import { selectedDate, weekDates } from '$lib/components/calendar/service.svelte';
	import type { Task } from '@life/shared/types';
	import { buildDate } from '$lib/task/time-utils';

	interface Props {
		tasks: Task[];
	}

	let { tasks }: Props = $props();

	const createTask = getCreateTask();
</script>

<!--Desktop-->
<div class="hidden grow md:flex">
	<div class="grid w-full grid-cols-7 divide-x border-x">
		{#each weekDates.value as date (date)}
			<CalendarDay
				class="hidden md:flex"
				create={(time) => createTask(buildDate(date, time))}
				{date}
				{tasks}
			/>
		{/each}
	</div>
	<div class="w-8"></div>
</div>

<!--Mobile-->
<div class="mb-5 block grow border border-b md:hidden">
	<CalendarDay
		class="block md:hidden"
		create={(time) => createTask(buildDate(selectedDate.value, time))}
		date={selectedDate.value}
		{tasks}
	/>
</div>
