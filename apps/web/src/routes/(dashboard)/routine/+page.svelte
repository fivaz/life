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

	let showDisableRoutines = $state<boolean>(false);
</script>

{#if currentUser.uid}
	<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
		<div class="flex size-full flex-col gap-5">
			<RoutineHeader routines={allRoutines} bind:showDisableRoutines />

			<WeekListSelector routines={availableRoutines} />

			{#if availableRoutines.length}
				<RoutineRows {showDisableRoutines} time="morning" title="Morning Routine" />
				<RoutineRows {showDisableRoutines} time="afternoon" title="Afternoon Routine" />
				<RoutineRows {showDisableRoutines} time="evening" title="Evening Routine" />
				<RoutineRows {showDisableRoutines} time="all-day" title="All day Routine" />
			{:else}
				<RoutineEmptyState />
			{/if}
		</div>
	</div>
{:else}
	<Loading />
{/if}
