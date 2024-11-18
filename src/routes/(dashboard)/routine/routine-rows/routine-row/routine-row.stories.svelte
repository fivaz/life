<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import type { Routine } from '$lib/routine/routine.model';
	import { routines } from '$lib/routine/routine.seed';
	import { formatDate } from '$lib/utils.svelte';

	import RoutineRow from './RoutineRow.svelte';

	const { Story } = defineMeta({
		component: RoutineRow,
		args: {
			routine: routines[0],
			userId: '',
			selectedDate: formatDate(new Date()),
			edit: (routine: Routine) => console.log(`routine ${routine.name} edited`),
		},
	});
</script>

<Story args={{}} name="Primary" />
