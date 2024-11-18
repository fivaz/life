<script lang="ts">
	import type { Routine } from '$lib/routine/routine.model';
	import { toggleRoutineCompletion, updateRoutines } from '$lib/routine/routine.repository';
	import { formatDate } from '$lib/utils.svelte';

	import { setRoutineDate, setToggleRoutineCompletion } from './service';
	import TimedRoutineRows from './timed-routine-rows/TimedRoutineRows.svelte';

	interface Props {
		selectedDate: Date;
		userId: string;
		routinesMap: Record<Routine['time'], Routine[]>;
	}

	let { selectedDate, userId, routinesMap }: Props = $props();

	let routineDate = $state(formatDate(selectedDate));

	setRoutineDate(routineDate);

	setToggleRoutineCompletion((routine: Routine) =>
		toggleRoutineCompletion(routine, routineDate, userId),
	);

	function update(routines: Routine[]) {
		updateRoutines(userId, routines);
	}
</script>

<TimedRoutineRows updateRoutines={update} bind:routinesMap time="morning" title="Morning Routine" />

<TimedRoutineRows
	updateRoutines={update}
	bind:routinesMap
	time="afternoon"
	title="Afternoon Routine"
/>

<TimedRoutineRows updateRoutines={update} bind:routinesMap time="evening" title="Evening Routine" />

<TimedRoutineRows updateRoutines={update} bind:routinesMap time="all-day" title="All day Routine" />
