<script lang="ts">
	import type { Routine } from '$lib/routine/routine.model';
	import { toggleRoutineCompletion, updateRoutines } from '$lib/routine/routine.repository';
	import { formatDate } from '$lib/utils.svelte';

	import { setRoutineDate, setToggleRoutineCompletion } from './service';
	import TimedRoutineRows from './timed-routine-rows/TimedRoutineRows.svelte';

	interface Props {
		selectedDate: Date;
		userId: string;
		routines: Routine[];
	}

	let { selectedDate, userId, routines }: Props = $props();

	let routineDate = $state(formatDate(selectedDate));

	setRoutineDate(routineDate);

	setToggleRoutineCompletion((routine: Routine) =>
		toggleRoutineCompletion(routine, routineDate, userId),
	);

	function filterBy(time: Routine['time']) {
		return routines.filter((routine) => routine.time === time);
	}

	let morningRoutines = $state(filterBy('morning'));
	let afternoonRoutines = $state(filterBy('afternoon'));
	let eveningRoutines = $state(filterBy('evening'));
	let allDayRoutines = $state(filterBy('all-day'));

	function update(routines: Routine[]) {
		updateRoutines(userId, routines);
	}
</script>

<TimedRoutineRows
	updateRoutines={update}
	bind:routines={morningRoutines}
	time="morning"
	title="Morning Routine"
/>

<TimedRoutineRows
	updateRoutines={update}
	bind:routines={afternoonRoutines}
	time="afternoon"
	title="Afternoon Routine"
/>

<TimedRoutineRows
	updateRoutines={update}
	bind:routines={eveningRoutines}
	time="evening"
	title="Evening Routine"
/>

<TimedRoutineRows
	updateRoutines={update}
	bind:routines={allDayRoutines}
	time="all-day"
	title="All day Routine"
/>
