<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { routinesMap } from '$lib/routine/routine.seed';

	import RoutineRows from './RoutineRows.svelte';

	const { Story } = defineMeta({
		component: RoutineRows,
		args: {
			routinesMap,
			userId: '',
			selectedDate: new Date(),
		},
	});
</script>

<Story args={{}} name="Primary" />
