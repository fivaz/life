<script lang="ts">
	import { clsx } from 'clsx';
	import { format, isSameDay, isToday } from 'date-fns';

	export let dates: Date[];
	export let selectedDate: Date;
</script>

<div class="grid grid-cols-7 text-sm leading-6 text-gray-500">
	{#each dates as date (date)}
		<button
			class="flex flex-col items-center pb-3 pt-2"
			on:click={() => (selectedDate = date)}
			type="button"
		>
			{format(date, 'EEEEE')}
			<span
				class={clsx(
					{
						'h-8 w-8 rounded-full bg-indigo-300 text-white':
							isToday(date) && !isSameDay(selectedDate, date),
						'h-8 w-8 rounded-full bg-indigo-600 text-white': isSameDay(selectedDate, date),
					},
					'mt-1 flex items-center justify-center font-semibold text-gray-900',
				)}
			>
				{format(date, 'dd')}
			</span>
		</button>
	{/each}
</div>
