<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import type { Routine } from '$lib/routine/routine.model';
	import { routinesMap } from '$lib/routine/routine.seed';

	import TimedRoutineRows from './TimedRoutineRows.svelte';

	const { Story } = defineMeta({
		component: TimedRoutineRows,
		args: {
			routinesMap,
			time: 'morning',
			title: 'Morning Routine',
			updateRoutines: (routines: Routine[]) => console.log('routines', routines),
		},
	});
</script>

<Story args={{}} name="Primary" />
