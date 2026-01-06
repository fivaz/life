<script lang="ts">
	import { buildDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';

	import { getCreateTask } from '$lib/components/context.utils';
	import { selectedDate, weekDates } from '$lib/components/service.svelte.js';

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
		class="grid w-full grid-cols-7 divide-x divide-gray-200 border-x border-gray-200 dark:divide-gray-700 dark:border-gray-700"
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
<div
	class="mb-5 block grow divide-gray-200 border border-b border-gray-200 md:hidden dark:divide-gray-700 dark:border-gray-700"
>
	<CalendarDay
		class="block md:hidden"
		create={(time) => createTask(buildDate(selectedDate.value, time))}
		date={selectedDate.value}
		{tasks}
	/>
</div>
