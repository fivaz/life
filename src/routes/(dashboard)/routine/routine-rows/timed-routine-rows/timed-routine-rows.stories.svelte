<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import type { Routine } from '$lib/routine/routine.model';
	import { routines } from '$lib/routine/routine.seed';

	import TimedRoutineRows from './TimedRoutineRows.svelte';

	const { Story } = defineMeta({
		component: TimedRoutineRows,
		args: {
			routines: routines.filter((routine) => routine.time === 'morning'),
			userId: '',
			selectedDate: new Date(),
			edit: (routine: Routine) => console.log(`routine ${routine.name} edited`),
		},
	});
</script>

<Story args={{}} name="Primary" />
