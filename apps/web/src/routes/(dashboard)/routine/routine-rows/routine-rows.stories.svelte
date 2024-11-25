<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { routinesMap as seed } from '$lib/routine/routine.seed';

	import { routinesMap } from '../service.svelte';
	import RoutineRows from './RoutineRows.svelte';

	const { Story } = defineMeta({
		component: RoutineRows,
		args: {
			time: 'morning',
			title: 'Morning Routine',
		},
	});

	routinesMap.value = seed;
</script>

<Story name="Primary" args={{}} />
