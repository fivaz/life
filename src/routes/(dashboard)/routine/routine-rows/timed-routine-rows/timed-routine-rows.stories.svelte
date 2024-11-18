<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import type { Routine } from '$lib/routine/routine.model';
	import { routinesMap as seed } from '$lib/routine/routine.seed';

	import { routinesMap } from '../../service.svelte';
	import TimedRoutineRows from './TimedRoutineRows.svelte';

	const { Story } = defineMeta({
		component: TimedRoutineRows,
		args: {
			time: 'morning',
			title: 'Morning Routine',
			updateRoutines: (routines: Routine[]) => console.log('routines', routines),
		},
	});

	routinesMap.value = seed;
</script>

<Story args={{}} name="Primary" />
