<script lang="ts">
	import { dates, selectedDate } from '$lib/components/calendar/service.svelte';
	import { buildDate } from '$lib/task/time-utils';
	import { getContext } from 'svelte';

	import CalendarRows from './calendar-rows/CalendarRows.svelte';
	import type { Task } from '$lib/task/utils';

	interface Props {
		tasks: Task[];
	}

	let { tasks }: Props = $props();

	const createTask = getContext('createTask');
</script>

<div class="hidden grow md:flex">
	<div class="grid w-full grid-cols-7 divide-x border-x">
		{#each dates.value as date (date)}
			<CalendarRows {date} {tasks} create={(time) => createTask(buildDate(date, time))} />
		{/each}
	</div>
	<div class="w-8"></div>
</div>

<div class="mb-5 block grow border border-b md:hidden">
	<CalendarRows
		{tasks}
		date={selectedDate.value}
		create={(time) => createTask(buildDate(selectedDate.value, time))}
	/>
</div>
