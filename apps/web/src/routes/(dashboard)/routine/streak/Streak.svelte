<script lang="ts">
	import { formatDate } from '@life/shared/date';
	import { startOfDay, subDays } from 'date-fns';
	import { Flame } from 'lucide-svelte';

	import type { Routine } from '$lib/routine/routine.model';

	import { getAvailableRoutines } from '../utils';

	interface Props {
		routines: Routine[];
	}

	let { routines }: Props = $props();

	let streak = $derived(getRoutinesStreak(routines));

	function getRoutinesStreak(routines: Routine[]): number {
		let streak = 0;
		let currentDate = startOfDay(new Date());

		if (allRoutinesHaveEntryForDate(routines, currentDate)) {
			streak++;
		}

		while (true) {
			currentDate = subDays(currentDate, 1);
			if (!allRoutinesHaveEntryForDate(routines, currentDate)) {
				break;
			}

			streak++;
		}

		return streak;
	}

	function allRoutinesHaveEntryForDate(routines: Routine[], date: Date): boolean {
		const availableRoutines = getAvailableRoutines(routines, date);

		// otherwise the loop doesn't end cause .every returns true in case the list is empty
		if (availableRoutines.length === 0) {
			return false;
		}

		const dateStr = formatDate(date);
		return routines.every((routine) =>
			routine.completeHistory.some((entry) => entry.date === dateStr),
		);
	}
</script>

<div class="flex items-center font-semibold text-red-500">
	<Flame class="h-6" />
	<div class="flex gap-1">
		<span>{streak}</span>
		<span class="hidden md:block">{streak > 1 ? 'days' : 'day'} streak!</span>
	</div>
</div>
