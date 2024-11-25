<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { routines } from '$lib/routine/routine.seed';

	import RoutineRow from './RoutineRow.svelte';

	const { Story } = defineMeta({
		component: RoutineRow,
		args: {
			routine: routines[0],
		},
	});
</script>

<Story name="Primary" args={{}} />
