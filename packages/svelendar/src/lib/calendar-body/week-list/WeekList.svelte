<script lang="ts">
	import { LText } from '@life/shared';
	import { borderColors } from '@life/shared/colors';
	import { clsx } from 'clsx';
	import { format, isSameDay } from 'date-fns';

	import { currentDate, selectedDate, weekDates } from '$lib/service.svelte';
</script>

{#snippet weekNumber(date: Date, selectedDate: Date)}
	{@const isDateSelected = isSameDay(selectedDate, date)}
	{@const isToday = isSameDay(currentDate.value, date)}
	<span
		class={clsx(
			{ 'bg-indigo-600 text-white': isDateSelected },
			{ 'bg-indigo-300 text-white': isToday && !isDateSelected },
			'mt-1 flex h-8 w-8 items-center justify-center rounded-full font-semibold',
		)}
	>
		{format(date, 'dd')}
	</span>
{/snippet}

<!--Desktop-->
<div
	class="-mr-px hidden grid-cols-7 divide-x border-b border-r text-sm leading-6 md:grid {borderColors.dark}"
>
	<div class="col-end-1 w-14"></div>
	{#each weekDates.value as date (date)}
		<div class="flex items-center justify-center py-3">
			<LText class="flex items-baseline gap-1">
				{format(date, 'E')}
				{@render weekNumber(date, selectedDate.value)}
			</LText>
		</div>
	{/each}
</div>

<!--Mobile-->
<div class="grid grid-cols-7 divide-x border-x text-sm leading-6 md:hidden {borderColors.dark}">
	{#each weekDates.value as date (date)}
		<button
			class="flex flex-col items-center pb-3 pt-2"
			onclick={() => (selectedDate.value = date)}
			type="button"
		>
			{format(date, 'EEEEE')}
			{@render weekNumber(date, selectedDate.value)}
		</button>
	{/each}
</div>
