<script lang="ts">
	import { LText } from '@life/shared';
	import { format, isSameDay } from 'date-fns';

	import { currentDate, selectedDate, weekDates } from '$lib/service.svelte';
</script>

{#snippet weekDay(date: Date, selectedDate: Date)}
	{@const isDateSelected = isSameDay(selectedDate, date)}
	{@const isToday = isSameDay(currentDate.value, date)}
	<span
		class="
		{isToday || isDateSelected ? 'bg-indigo-300 text-white' : 'text-gray-700 dark:text-gray-300'}
					{isToday && !isDateSelected ? ' bg-indigo-300' : ''}
						{isDateSelected ? 'bg-indigo-600' : ''}
					mt-1 flex h-8 w-8 items-center justify-center rounded-full font-semibold"
	>
		{format(date, 'dd')}
	</span>
{/snippet}

<!--Desktop-->
<div
	class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-b border-r border-gray-100 text-sm leading-6 text-gray-500 md:grid dark:divide-gray-900 dark:border-gray-900"
>
	<div class="col-end-1 w-14"></div>
	{#each weekDates.value as date (date)}
		<div class="flex items-center justify-center py-3">
			<LText class="flex items-baseline gap-1">
				{format(date, 'E')}
				{@render weekDay(date, selectedDate.value)}
			</LText>
		</div>
	{/each}
</div>

<!--Mobile-->
<div
	class="grid grid-cols-7 divide-x divide-gray-100 border-x border-gray-100 text-sm leading-6 text-gray-500 md:hidden dark:divide-gray-900 dark:border-gray-900"
>
	{#each weekDates.value as date (date)}
		<button
			class="flex flex-col items-center pb-3 pt-2"
			onclick={() => (selectedDate.value = date)}
			type="button"
		>
			{format(date, 'EEEEE')}
			{@render weekDay(date, selectedDate.value)}
		</button>
	{/each}
</div>
