<script lang="ts">
	import { startOfWeek } from 'date-fns';
	import { onSnapshot, type Unsubscribe } from 'firebase/firestore';

	import Loading from '$lib/components/loading/Loading.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { weekStartsOn } from '$lib/date.utils.svelte';
	import { formatDate, title } from '$lib/date.utils.svelte.js';
	import { buildEmptyRoutine, type Routine } from '$lib/routine/routine.model';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import RoutineEmptyState from './routine-empty-state/RoutineEmptyState.svelte';
	import RoutineForm from './routine-form/RoutineForm.svelte';
	import RoutineHeader from './routine-header/RoutineHeader.svelte';
	import RoutineRows from './routine-rows/RoutineRows.svelte';
	import { setOpenRoutineForm } from './routine-rows/service';
	import { getRoutinePath, isLoading, populateRoutines, routinesMap } from './service.svelte';
	import WeekListSelector from './week-list-selector/WeekListSelector.svelte';

	let _weekStart = $state<Date>(startOfWeek(new Date(), { weekStartsOn }));

	// this is used in WeekListSelector to know the right direction for the slide animation
	let previousWeekStart = $state<Date>(startOfWeek(new Date(), { weekStartsOn }));

	const weekStart = {
		get value() {
			return _weekStart;
		},
		set value(value) {
			previousWeekStart = _weekStart;
			_weekStart = value;
		},
	};

	let editingRoutine = $state<Routine>(buildEmptyRoutine());

	let showForm = $state<boolean>(false);

	let selectedDate = $state<Date>(new Date());

	const selectedDateString = $derived(formatDate(selectedDate));

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
			<RoutineHeader bind:weekStart={weekStart.value} {routines} bind:selectedDate />

			<WeekListSelector
				bind:selectedDate
				{routines}
				weekStart={weekStart.value}
				{previousWeekStart}
			/>

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
