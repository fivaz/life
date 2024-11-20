<script lang="ts">
	import type { Unsubscribe } from 'firebase/firestore';
	import { onSnapshot } from 'firebase/firestore';

	import Loading from '$lib/components/loading/Loading.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { yyyyMMdd } from '$lib/date.utils.svelte';
	import { formatDate, selectedDate, title } from '$lib/date.utils.svelte';
	import type { Routine } from '$lib/routine/routine.model';
	import { buildEmptyRoutine } from '$lib/routine/routine.model';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import RoutineEmptyState from './routine-empty-state/RoutineEmptyState.svelte';
	import RoutineForm from './routine-form/RoutineForm.svelte';
	import RoutineHeader from './routine-header/RoutineHeader.svelte';
	import RoutineRows from './routine-rows/RoutineRows.svelte';
	import { setOpenRoutineForm } from './routine-rows/service';
	import { getRoutinePath, isLoading, populateRoutines, routinesMap } from './service.svelte';
	import WeekListSelector from './week-list-selector/WeekListSelector.svelte';

	let editingRoutine = $state<Routine>(buildEmptyRoutine());

	let showForm = $state<boolean>(false);

	const selectedDateString = $derived<yyyyMMdd>(formatDate(selectedDate.value));

	title.value = 'Routine';

	function openForm(routine = buildEmptyRoutine()) {
		showForm = true;
		editingRoutine = routine;
	}

	setOpenRoutineForm(openForm);

	$effect(() => {
		let unsubscribe: Unsubscribe = () => {};

		if (currentUser.uid) {
			isLoading.value = true;
			unsubscribe = onSnapshot(getRoutinePath(currentUser.uid), populateRoutines);
		}

		return () => unsubscribe();
	});
</script>

{#if currentUser.uid}
	{@const routines = Object.values(routinesMap.value).flat()}

	<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
		<div class="flex h-full w-full flex-col gap-5">
			<RoutineHeader {routines} />

			<WeekListSelector {routines} />

			{#if routines.length}
				<RoutineRows selectedDate={selectedDateString} time="morning" title="Morning Routine" />
				<RoutineRows selectedDate={selectedDateString} time="afternoon" title="Afternoon Routine" />
				<RoutineRows selectedDate={selectedDateString} time="evening" title="Evening Routine" />
				<RoutineRows selectedDate={selectedDateString} time="all-day" title="All day Routine" />
			{:else}
				<RoutineEmptyState />
			{/if}

			<Modal bind:isOpen={showForm}>
				<RoutineForm close={() => (showForm = false)} routine={editingRoutine} />
			</Modal>
		</div>
	</div>
{:else}
	<Loading />
{/if}
