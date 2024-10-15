<script lang="ts">
	import type { Routine } from '$lib/routine/utils';

	import { DATE } from '$lib/consts';
	import { clsx } from 'clsx';
	import { format, isSameDay, isToday } from 'date-fns';
	import { CheckCheck } from 'lucide-svelte';

	export let routines: Routine[];
	export let dates: Date[];
	export let selectedDate: Date;

	function isCompleted(selectedDate: Date, routines: Routine[]): boolean {
		const dateString = format(selectedDate, DATE);
		return routines.every((routine) =>
			routine.completeHistory.some(({ date, isCompleted }) => date === dateString && isCompleted),
		);
	}
</script>

<div
	class="grid grid-cols-7 divide-x divide-gray-100 border-x border-gray-100 text-sm leading-6 text-gray-500"
>
	{#each dates as date (date)}
		<button
			class="flex items-center justify-center py-3"
			on:click={() => (selectedDate = date)}
			type="button"
		>
			<span class="flex items-baseline gap-1">
				{#if isCompleted(date, routines)}
					<CheckCheck class="h-5 w-auto self-center text-red-500" />
				{/if}
				{format(date, 'E')}
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
			</span>
		</button>
	{/each}
</div>
