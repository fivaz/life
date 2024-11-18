<script lang="ts">
	import type { Routine } from '$lib/routine/routine.model';
	import { toggleRoutineCompletion, updateRoutines } from '$lib/routine/routine.repository';
	import { formatDate } from '$lib/utils.svelte';

	import { setToggleRoutineCompletion } from './service';
	import TimedRoutineRows from './timed-routine-rows/TimedRoutineRows.svelte';

	interface Props {
		selectedDate: Date;
		userId: string;
	}

	let { selectedDate, userId }: Props = $props();

	let selectedDateString = $derived(formatDate(selectedDate));

	setToggleRoutineCompletion((routine: Routine) =>
		toggleRoutineCompletion(routine, selectedDateString, userId),
	);

	function update(routines: Routine[]) {
		updateRoutines(userId, routines);
	}
</script>

<TimedRoutineRows
	selectedDate={selectedDateString}
	updateRoutines={update}
	time="morning"
	title="Morning Routine"
/>
<TimedRoutineRows
	selectedDate={selectedDateString}
	updateRoutines={update}
	time="afternoon"
	title="Afternoon Routine"
/>
<TimedRoutineRows
	selectedDate={selectedDateString}
	updateRoutines={update}
	time="evening"
	title="Evening Routine"
/>
<TimedRoutineRows
	selectedDate={selectedDateString}
	updateRoutines={update}
	time="all-day"
	title="All day Routine"
/>
