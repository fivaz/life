<script lang="ts">
	import type { TEvent } from '$lib';
	import classnames from 'classnames';
	import {
		addDays,
		format,
		getDate,
		isWithinInterval,
		parseISO,
		startOfDay,
		endOfDay
	} from 'date-fns';

	import CalendarRows from './calendar-rows/index.svelte';

	export let events: TEvent[];
	export let weekStart: Date;
	export let currentDate: Date;

	let selectedDate: Date = currentDate;

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	function isEventOnDay(event: TEvent, targetDay: Date): boolean {
		const eventStart = parseISO(event.startTime);
		const eventEnd = parseISO(event.endTime);

		return (
			isWithinInterval(eventStart, { start: startOfDay(targetDay), end: endOfDay(targetDay) }) ||
			isWithinInterval(eventEnd, { start: startOfDay(targetDay), end: endOfDay(targetDay) })
		);
	}
</script>

<div class="h-full w-full bg-white text-sm leading-6 text-gray-500">
	<div class="h-full hidden sm:grid grid-cols-7 divide-x">
		{#each dates as date (date)}
			<div class="h-full flex flex-col divide-y">
				<div class="flex items-center justify-center gap-1 flex-row py-3">
					{format(date, 'E')}
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

	<div class="h-full block sm:hidden divide-y">
		<div class="grid grid-cols-7">
			{#each dates as date (date)}
				<button
					on:click={() => (selectedDate = date)}
					class="flex items-center justify-center gap-1 flex-col pt-2 pb-3"
				>
					{format(date, 'EEEEE')}
					<span
						class={classnames(
							{
								'rounded-full bg-indigo-300 text-white':
									getDate(selectedDate) === getDate(date) && getDate(currentDate) !== getDate(date)
							},
							{ 'rounded-full bg-indigo-600 text-white': getDate(currentDate) === getDate(date) },
							'flex items-center justify-center font-semibold h-8 w-8'
						)}
					>
						{format(date, 'dd')}
					</span>
				</button>
			{/each}
		</div>
		<CalendarRows events={events.filter((event) => isEventOnDay(event, selectedDate))} />
	</div>
</div>
