<script lang="ts">
	import { orderBy } from 'firebase/firestore';

	import Loading from '$lib/components/loading/Loading.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { DB_PATH } from '$lib/consts';
	import { title } from '$lib/date.utils.svelte';
	import { fetchItems } from '$lib/repository.svelte';
	import type { Routine } from '$lib/routine/routine.model';
	import { buildEmptyRoutine, routineSchema } from '$lib/routine/routine.model';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import RoutineEmptyState from './routine-empty-state/RoutineEmptyState.svelte';
	import RoutineForm from './routine-form/RoutineForm.svelte';
	import RoutineHeader from './routine-header/RoutineHeader.svelte';
	import RoutineRows from './routine-rows/RoutineRows.svelte';
	import { setOpenRoutineForm } from './routine-rows/service';
	import {
		emptyRoutineMap,
		routinesMap,
	} from './service.svelte';
	import WeekListSelector from './week-list-selector/WeekListSelector.svelte';

	let editingRoutine = $state<Routine>(buildEmptyRoutine());

	let showForm = $state<boolean>(false);

	title.value = 'Routine';

	function openForm(routine = buildEmptyRoutine()) {
		showForm = true;
		editingRoutine = routine;
	}

	setOpenRoutineForm(openForm);

	function convertToMap(newRoutines: Routine[]) {
		routinesMap.value = emptyRoutineMap;
		newRoutines.forEach((routine) => {
			routinesMap.value[routine.time].push(routine);
		});
	}

	fetchItems(convertToMap, DB_PATH.ROUTINES, routineSchema, orderBy('order'));

	let routines = $derived(Object.values(routinesMap.value).flat());

	$inspect(routines);

	$inspect(routinesMap);
</script>

{#if currentUser.uid}
	<div class="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
		<div class="flex h-full w-full flex-col gap-5">
			<RoutineHeader {routines} />

			<WeekListSelector {routines} />

			{#if routines.length}
				<RoutineRows time="morning" title="Morning Routine" />
				<RoutineRows time="afternoon" title="Afternoon Routine" />
				<RoutineRows time="evening" title="Evening Routine" />
				<RoutineRows time="all-day" title="All day Routine" />
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
