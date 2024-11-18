<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { routines } from '$lib/routine/routine.seed';

	import RoutineRows from './RoutineRows.svelte';

	const { Story } = defineMeta({
		component: RoutineRows,
		args: {
			routines,
			userId: '',
			selectedDate: new Date(),
		},
	});
</script>

<Story args={{}} name="Primary" />
