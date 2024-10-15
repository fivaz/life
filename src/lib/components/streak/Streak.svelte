<script lang="ts">
	import type { Routine } from '$lib/routine/utils';

	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';
	import { Flame } from 'lucide-svelte';

	export let routines: Routine[];

	function allRoutinesHaveEntryForDate(routines: Routine[], date: string): boolean {
		// otherwise the loop doesn't end cause .every returns true in case the list is empty
		if (routines.length === 0) {
			return false;
		}

		return routines.every((routine) =>
			routine.completeHistory.some((entry) => entry.date === date),
		);
	}

	function getRoutineStreak(routines: Routine[]): number {
		let streak = 0;
		let currentDate = new Date();

		while (true) {
			const dateStr = format(currentDate, DATE);

			if (!allRoutinesHaveEntryForDate(routines, dateStr)) {
				break;
			}

			streak++;
			currentDate.setDate(currentDate.getDate() - 1);
		}

		return streak;
	}

	$: streak = getRoutineStreak(routines);
</script>

<div class="flex items-center font-semibold text-red-500">
	<Flame class="h-7 w-auto" />
	{streak}
	{streak > 1 ? 'days' : 'day'} streak!
</div>
