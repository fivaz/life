<script lang="ts">
	import { format, subDays } from 'date-fns';
	import { Flame } from 'lucide-svelte';

	import { DATE } from '$lib/date.utils.svelte';
	import type { Routine } from '$lib/routine/routine.model';

	interface Props {
		routines: Routine[];
	}

	let { routines }: Props = $props();

	let streak = $derived(getRoutinesStreak(routines));

	function getRoutinesStreak(routines: Routine[]): number {
		let streak = 0;
		let currentDate = new Date();
		const todayStr = format(currentDate, DATE);

		if (allRoutinesHaveEntryForDate(routines, todayStr)) {
			streak++;
		}

		while (true) {
			currentDate = subDays(currentDate, 1);
			const dateStr = format(currentDate, DATE);

			if (!allRoutinesHaveEntryForDate(routines, dateStr)) {
				break;
			}

			streak++;
		}

		return streak;
	}

	function allRoutinesHaveEntryForDate(routines: Routine[], date: string): boolean {
		// otherwise the loop doesn't end cause .every returns true in case the list is empty
		if (routines.length === 0) {
			return false;
		}

		return routines.every((routine) =>
			routine.completeHistory.some((entry) => entry.date === date),
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
