<script lang="ts">
	import { buildDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';

	import { getCreateTask } from '../../context.utils.js';
	import { selectedDate, weekDates } from '../../service.svelte.js';
	import CalendarDay from './calendar-day/CalendarDay.svelte';

	interface Props {
		tasks: Task[];
	}

	let { tasks }: Props = $props();

	const createTask = getCreateTask();
</script>

<!--Desktop-->
<div class="hidden grow md:flex">
	<div
		class="grid w-full grid-cols-7 divide-x divide-gray-200 border-x border-gray-200 dark:divide-gray-800 dark:border-gray-800"
	>
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
