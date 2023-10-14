<script lang="ts">
	import type { TEvent } from '$lib';
	import classnames from 'classnames';
	import { addDays, format, getDate, isWithinInterval, parseISO } from 'date-fns';

	import CalendarRows from './calendar-rows/index.svelte';

	export let events: TEvent[];
	export let weekStart: Date;
	export let currentDate: Date;

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	function isEventOnDay(event: TEvent, targetDay: Date): boolean {
		const start = parseISO(event.startTime);
		const end = parseISO(event.endTime);

		// Create an interval from start to end time
		const eventInterval = { start, end };

		// Check if the target day falls within the interval
		return isWithinInterval(targetDay, eventInterval);
	}
</script>

<div class="flex-auto bg-white shadow ring-1 ring-black ring-opacity-5">
	<div
		class="grid grid-cols-7 -mr-px sm:divide-x sm:divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500"
	>
		{#each dates as date (date)}
			<div class="flex flex-col">
				<div class="flex items-center justify-center gap-1 flex-col sm:flex-row pt-2 pb-3 sm:py-3">
					<span class="hidden sm:block">{format(date, 'E')}</span>
					<span class="block sm:hidden">{format(date, 'EEEEE')}</span>
					<span
						class={classnames(
							{ 'rounded-full bg-indigo-600 text-white': getDate(currentDate) === getDate(date) },
							'flex items-center justify-center font-semibold h-8 w-8'
						)}
					>
						{format(date, 'dd')}
					</span>
				</div>
				<CalendarRows events={events.filter((event) => isEventOnDay(event, date))} />
			</div>
		{/each}
	</div>
</div>
