<script lang="ts">
	import Loading from '$lib/components/loading/Loading.svelte';
	import { fetchRoutines } from '$lib/routine/routine.repository';
	import { currentUser } from '$lib/user/user.utils.svelte';
	import { title } from '$lib/utils.svelte';

	import RoutineEmptyState from './routine-empty-state/RoutineEmptyState.svelte';
	import RoutineHeader from './routine-header/RoutineHeader.svelte';
	import RoutineRows from './routine-rows/RoutineRows.svelte';
	import { routinesMap, selectedDate } from './service.svelte';
	import { getAvailableRoutines } from './utils';
	import WeekListSelector from './week-list-selector/WeekListSelector.svelte';

	title.value = 'Routine';

	fetchRoutines();

	let allRoutines = $derived(Object.values(routinesMap.value).flat());

	let availableRoutines = $derived(getAvailableRoutines(allRoutines, selectedDate.value));
</script>

{#if currentUser.uid}
	<div class="border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
		<div class="mx-auto max-w-7xl pt-4 sm:px-6 lg:px-8">
			<div class="flex size-full flex-col gap-5">
				<div class="px-4 sm:px-0">
					<RoutineHeader routines={allRoutines} />
				</div>

				<WeekListSelector routines={availableRoutines} />
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
		<div class="flex size-full flex-col gap-5">
			{#if availableRoutines.length}
				<RoutineRows time="morning" title="Morning Routine" />
				<RoutineRows time="afternoon" title="Afternoon Routine" />
				<RoutineRows time="evening" title="Evening Routine" />
				<RoutineRows time="all-day" title="All day Routine" />
			{:else}
				<RoutineEmptyState />
			{/if}
		</div>
	</div>
{:else}
	<Loading />
{/if}
