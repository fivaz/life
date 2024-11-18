<script lang="ts">
	import type { Routine } from '$lib/routine/routine.model';
	import { toggleRoutineCompletion } from '$lib/routine/routine.repository';
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
</script>

<TimedRoutineRows {routines} time="morning" title="Morning Routine" />
<TimedRoutineRows {routines} time="afternoon" title="Afternoon Routine" />
<TimedRoutineRows {routines} time="evening" title="Evening Routine" />
<TimedRoutineRows special={true} {routines} time="all-day" title="All day Routine" />
