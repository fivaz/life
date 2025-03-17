<script lang="ts">
	import { buildDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';

	import { getCreateTask } from '$lib/context.utils';
	import { selectedDate, weekDates } from '$lib/service.svelte';

	import CalendarDay from './calendar-day/CalendarDay.svelte';

	interface Props {
		tasks: Task[];
	}

	let { tasks }: Props = $props();

	const createTask = getCreateTask();
</script>

<!--Desktop-->
<div class="hidden grow md:flex">
	<div class="border-light grid w-full grid-cols-7 divide-x border-x">
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
<div class="border-light mb-5 block grow border border-b md:hidden">
	<CalendarDay
		class="block md:hidden"
		create={(time) => createTask(buildDate(selectedDate.value, time))}
		date={selectedDate.value}
		{tasks}
	/>
</div>
