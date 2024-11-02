<script lang="ts">
	import type { Routine } from '$lib/routine/utils';

	import { DATE } from '$lib/consts';
	import { clsx } from 'clsx';
	import { format, isSameDay, isToday } from 'date-fns';
	import { CheckCheck } from 'lucide-svelte';

	interface Props {
		routines: Routine[];
		dates: Date[];
		selectedDate: Date;
	}

	let { routines, dates, selectedDate = $bindable() }: Props = $props();

	function isCompleted(selectedDate: Date, routines: Routine[]): boolean {
		const dateString = format(selectedDate, DATE);
		return routines.every((routine) =>
			routine.completeHistory.some(({ date, isCompleted }) => date === dateString && isCompleted),
		);
	}
</script>

<div
	class="grid grid-cols-7 divide-gray-100 border border-gray-100 text-sm leading-6 text-gray-500 md:divide-x"
>
	{#each dates as date (date)}
		<button
			class="flex flex-col items-center justify-center gap-1 pb-3 pt-2 md:flex-row"
			onclick={() => (selectedDate = date)}
			type="button"
		>
			<span class="hidden md:block">
				{#if isCompleted(date, routines)}
					<CheckCheck class="h-5 w-auto self-center text-red-500" />
				{/if}
			</span>
			<span class="hidden md:block">{format(date, 'E')}</span>
			<span class="block md:hidden">{format(date, 'EEEEE')}</span>

			<span
				class={clsx(
					{
						'bg-indigo-300 text-white': isToday(date) && !isSameDay(selectedDate, date),
						'bg-indigo-600 text-white': isSameDay(selectedDate, date),
					},
					'flex h-8 w-8 items-center justify-center rounded-full font-semibold text-gray-900',
				)}
			>
				{format(date, 'dd')}
			</span>
		</button>
	{/each}
</div>
