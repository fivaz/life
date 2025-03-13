<script lang="ts">
	import { LText } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import { clsx } from 'clsx';
	import { format, isSameDay, isToday, startOfWeek } from 'date-fns';
	import { CheckCheck } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	import type { Routine } from '$lib/routine/routine.model';

	import { previousDate, selectedDate, weekChangeDuration, weekDates } from '../service.svelte';

	interface Props {
		routines: Routine[];
	}

	let { routines }: Props = $props();

	function isCompleted(selectedDate: Date, routines: Routine[]): boolean {
		const dateString = formatDate(selectedDate);
		return routines.every((routine) =>
			routine.completeHistory.some(({ date, isCompleted }) => date === dateString && isCompleted),
		);
	}

	const slideDirection = $derived.by(() => {
		const weekStart = startOfWeek(selectedDate.value);
		const previousWeekStart = startOfWeek(previousDate.value);
		return weekStart.getTime() > previousWeekStart.getTime() ? 1 : -1;
	});
</script>

<div class="relative h-20 md:h-14">
	{#key weekDates.value}
		<div
			class="absolute grid w-full grid-cols-7 divide-gray-300 border border-gray-300 text-sm leading-6 text-gray-500 md:divide-x dark:divide-gray-700 dark:border-gray-700"
			in:fly={{ x: 900 * slideDirection, duration: weekChangeDuration }}
			out:fly={{ x: 900 * slideDirection * -1, duration: weekChangeDuration }}
		>
			{#each weekDates.value as date (date)}
				<button
					class="flex flex-col items-center justify-center gap-1 pb-3 pt-2 hover:bg-indigo-200 md:flex-row dark:hover:bg-gray-700"
					onclick={() => (selectedDate.value = date)}
					type="button"
				>
					<span class="hidden md:block">
						{#if isCompleted(date, routines)}
							<CheckCheck class="h-5 w-auto self-center text-red-500" />
						{/if}
					</span>
					<LText class="hidden md:block">{format(date, 'E')}</LText>
					<LText class="block md:hidden">{format(date, 'EEEEE')}</LText>

					<LText
						class={clsx(
							{
								' bg-indigo-300 text-white dark:bg-indigo-400':
									isToday(date) && !isSameDay(selectedDate.value, date),
								'bg-indigo-600 text-white dark:bg-indigo-700': isSameDay(selectedDate.value, date),
							},
							'flex h-8 w-8 items-center justify-center rounded-full font-semibold',
						)}
					>
						{format(date, 'dd')}
					</LText>
				</button>
			{/each}
		</div>
	{/key}
</div>
