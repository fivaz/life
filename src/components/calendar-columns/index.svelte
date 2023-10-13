<script lang="ts">
	import { getDate } from 'date-fns';
	import CalendarRows from './calendar-rows/index.svelte';
	import classnames from 'classnames';
	let containerNav: HTMLDivElement;

	let daysAndDates = [
		{ day: 'Mon', dayShort: 'M', date: 10 },
		{ day: 'Tue', dayShort: 'T', date: 11 },
		{ day: 'Wed', dayShort: 'W', date: 12 },
		{ day: 'Thu', dayShort: 'T', date: 13 },
		{ day: 'Fri', dayShort: 'F', date: 14 },
		{ day: 'Sat', dayShort: 'S', date: 15 },
		{ day: 'Sun', dayShort: 'S', date: 16 }
	];

	const currentDate = new Date();
</script>

<div
	bind:this={containerNav}
	class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5"
>
	<div class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
		{#each daysAndDates as { dayShort, day, date } (day)}
			<button type="button" class="flex flex-col items-center pt-2 pb-3">
				{dayShort}
				{#if getDate(currentDate) === date}
					<span
						class="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
					>
						{date}
					</span>
				{:else}
					<span class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
						{date}
					</span>
				{/if}
			</button>
			<CalendarRows />
		{/each}
	</div>

	<div
		class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid"
	>
		{#each daysAndDates as { day, date } (day)}
			<div class="flex flex-col">
				<div class="flex items-center justify-center py-3 gap-1">
					{day}
					<span
						class={classnames(
							{ 'rounded-full bg-indigo-600 text-white': getDate(currentDate) === date },
							'flex items-center justify-center font-semibold h-8 w-8'
						)}
					>
						{date}
					</span>
				</div>
				<CalendarRows />
			</div>
		{/each}
	</div>
</div>
