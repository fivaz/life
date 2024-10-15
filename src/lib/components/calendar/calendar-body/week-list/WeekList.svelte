<script lang="ts">
	import WeekListSelector from '$lib/components/week-list-selector/WeekListSelector.svelte';
	import { clsx } from 'clsx';
	import { format, isToday } from 'date-fns';

	export let dates: Date[];
	export let selectedDate: Date;
</script>

<div class="md:hidden">
	<WeekListSelector {dates} {selectedDate} />
</div>

<div
	class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 md:grid"
>
	<div class="col-end-1 w-14" />
	{#each dates as date (date)}
		<div class="flex items-center justify-center py-3">
			<span class="flex items-baseline gap-1">
				{format(date, 'E')}
				<span
					class={clsx('flex items-center justify-center font-semibold text-gray-900', {
						'h-8 w-8 rounded-full bg-indigo-600 text-white': isToday(date),
					})}
				>
					{format(date, 'dd')}
				</span>
			</span>
		</div>
	{/each}
</div>
