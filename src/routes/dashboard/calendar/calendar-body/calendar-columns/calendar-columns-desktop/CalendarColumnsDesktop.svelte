<script lang="ts">
	import classnames from 'classnames';
	import { format, isToday } from 'date-fns';
	import CalendarRows from '../calendar-rows/CalendarRows.svelte';
	import Stats from '../stats/Stats.svelte';

	export let dates: Date[];

	let className = '';
	export { className as class };
</script>

<div class={className}>
	<div class="h-full grid grid-cols-7 divide-x">
		{#each dates as date (date)}
			<div>
				<Stats {date} />
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
			</div>
		{/each}
	</div>
</div>
