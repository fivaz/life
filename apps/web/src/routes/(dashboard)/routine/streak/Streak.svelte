<script lang="ts">
	import { formatDate } from '@life/shared/date';
	import { Flame } from '@lucide/svelte';
	import { startOfDay, subDays } from 'date-fns';

	import type { Routine } from '$lib/routine/routine.model';

	import { getAvailableRoutines, isRoutineVisible } from '../utils';

	interface Props {
		routines: Routine[];
	}

	let { routines }: Props = $props();

	let validRoutines = $derived(routines.filter((routine) => isRoutineVisible(routine)));

	let streak = $derived(getRoutinesStreak(validRoutines));

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
		return availableRoutines.every((routine) =>
			routine.completeHistory.some((entry) => entry.date === dateStr),
		);
	}
</script>

<div class="flex items-center font-semibold text-red-500">
	<Flame class="h-6" />
	<span class="mr-1">{streak}</span>
	<span class="">{streak > 1 ? 'days' : 'day'} streak!</span>
	<div class="flex gap-1"></div>
</div>
