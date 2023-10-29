<script lang="ts">
	import classnames from 'classnames';
	import { addDays, format, isToday } from 'date-fns';
	import CalendarRows from '../calendar-rows/CalendarRows.svelte';

	export let weekStart: Date;

	let className = '';
	export { className as class };

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
</script>

<div class={className}>
	<div class="h-full grid grid-cols-7 divide-x">
		{#each dates as date (date)}
			<div class="h-full flex flex-col divide-y">
				<div class="flex items-center justify-center gap-1 flex-row py-3">
					{format(date, 'E')}
					<span
						class={classnames(
							{ 'rounded-full bg-indigo-600 text-white': isToday(date) },
							'flex items-center justify-center font-semibold h-8 w-8',
						)}
					>
						{format(date, 'dd')}
					</span>
				</div>
				<CalendarRows {date} on:edit on:create />
			</div>
		{/each}
	</div>
</div>
