<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { routinesMap as seed } from '$lib/routine/routine.seed';

	import { routinesMap } from '../service.svelte';
	import RoutineRows from './RoutineRows.svelte';

	const { Story } = defineMeta({
		component: RoutineRows,
		args: {
			userId: '',
			selectedDate: new Date(),
		},
	});

	routinesMap.value = seed;
</script>

<Story args={{}} name="Primary" />
