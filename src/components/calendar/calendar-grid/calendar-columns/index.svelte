<script lang="ts">
	import { addDays, format, getDate, startOfWeek } from 'date-fns';
	import CalendarRows from './calendar-rows/index.svelte';
	import classnames from 'classnames';

	export let weekStart: Date;
	export let currentDate: Date;

	// Array.from({ length: 7 }, (_, i) => format(addDays(weekStart, i), 'EEEE'));

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	let events = [
		{
			label: 'Breakfast',
			startTime: '2023-10-12T06:00',
			endTime: '2023-10-12T07:00'
		},
		{
			label: 'Flight to Paris',
			startTime: '2023-10-12T07:30',
			endTime: '2023-10-12T10:00'
		},
		{
			label: 'Meeting with design team at Disney',
			startTime: '2023-10-15T10:00',
			endTime: '2023-10-15T12:00'
		}
	];
</script>

<div class="flex-auto bg-white shadow ring-1 ring-black ring-opacity-5">
	<div
		class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid"
	>
		{#each dates as date (date)}
			<div class="flex flex-col">
				<div class="flex items-center justify-center py-3 gap-1">
					{format(date, 'EEE')}
					<span
						class={classnames(
							{ 'rounded-full bg-indigo-600 text-white': getDate(currentDate) === getDate(date) },
							'flex items-center justify-center font-semibold h-8 w-8'
						)}
					>
						{format(date, 'dd')}
					</span>
				</div>
				<CalendarRows />
			</div>
		{/each}
	</div>

	<div class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
		{#each dates as date (date)}
			<button type="button" class="flex flex-col items-center pt-2 pb-3">
				{format(date, 'E')}
				<span
					class={classnames(
						{ 'rounded-full bg-indigo-600 text-white': getDate(currentDate) === getDate(date) },
						'mt-1 flex items-center justify-center font-semibold h-8 w-8'
					)}
				>
					{format(date, 'dd')}
				</span>
			</button>
			<CalendarRows />
		{/each}
	</div>
</div>
