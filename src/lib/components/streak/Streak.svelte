<script lang="ts">
	import type { Routine } from '$lib/routine/utils';

	import { DATE } from '$lib/consts';
	import { format, subDays } from 'date-fns';
	import { Flame } from 'lucide-svelte';

	interface Props {
		routines: Routine[];
	}

	let { routines }: Props = $props();

	let streak = $derived(getRoutinesStreak(routines));

	function allRoutinesHaveEntryForDate(routines: Routine[], date: string): boolean {
		// otherwise the loop doesn't end cause .every returns true in case the list is empty
		if (routines.length === 0) {
			return false;
		}

		return routines.every((routine) =>
			routine.completeHistory.some((entry) => entry.date === date),
		);
	}

	function getRoutinesStreak(routines: Routine[]): number {
		let streak = 0;
		let currentDate = new Date();

		while (true) {
			const dateStr = format(currentDate, DATE);

			if (!allRoutinesHaveEntryForDate(routines, dateStr)) {
				break;
			}

			streak++;
			currentDate = subDays(currentDate, 1);
		}

		return streak;
	}
</script>

<div class="flex items-center font-semibold text-red-500">
	<Flame class="h-6" />
	<div class="flex gap-1">
		<span>{streak}</span>
		<span class="hidden md:block">{streak > 1 ? 'days' : 'day'} streak!</span>
	</div>
</div>
