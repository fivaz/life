<script lang="ts">
	import { format, isSameDay, isToday } from 'date-fns';

	import { selectedDate, weekDates } from '../../service.svelte.js';
</script>

{#snippet weekDay(date: Date, selectedDate: Date)}
	{@const isDateSelected = isSameDay(selectedDate, date)}
	<span
		class="
		{isToday(date) || isDateSelected
			? 'h-8 w-8 rounded-full bg-indigo-300 text-white'
			: 'text-gray-900'}
					{isToday(date) && !isDateSelected ? ' bg-indigo-300 ' : ''}
						{isDateSelected ? 'bg-indigo-600 ' : ''}
					mt-1 flex items-center justify-center font-semibold"
	>
		{format(date, 'dd')}
	</span>
{/snippet}

<!--Desktop-->
<div
	class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 md:grid"
>
	<div class="col-end-1 w-14"></div>
	{#each weekDates.value as date (date)}
		<div class="flex items-center justify-center py-3">
			<span class="flex items-baseline gap-1">
				{format(date, 'E')}
				{@render weekDay(date, selectedDate.value)}
			</span>
		</div>
	{/each}
</div>

<!--Mobile-->
<div
	class="grid grid-cols-7 divide-x divide-gray-100 border-x border-gray-100 text-sm leading-6 text-gray-500 md:hidden"
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
