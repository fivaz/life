<script lang="ts">
	import classnames from 'classnames';
	import { addDays, format, getDate, isToday } from 'date-fns';

	import CalendarRows from '../calendar-rows/CalendarRows.svelte';

	export let weekStart: Date;

	let selectedDate = new Date();

	let className = '';
	export { className as class };

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	$: isSelectedDate = (date: Date) => getDate(selectedDate) === getDate(date);
</script>

<div class={classnames('h-full divide-y', className)}>
	<div class="grid grid-cols-7">
		{#each dates as date (date)}
			<button
				on:click={() => (selectedDate = date)}
				class="flex items-center justify-center gap-1 flex-col pt-2 pb-3"
			>
				{format(date, 'EEEEE')}
				<span
					class={classnames(
						{ 'rounded-full bg-indigo-300 text-white': isSelectedDate(date) && !isToday(date) },
						{ 'rounded-full bg-indigo-600 text-white': isToday(date) },
						'flex items-center justify-center font-semibold h-8 w-8',
					)}
				>
					{format(date, 'dd')}
				</span>
			</button>
		{/each}
	</div>
	<CalendarRows date={selectedDate} on:edit on:create />
</div>
