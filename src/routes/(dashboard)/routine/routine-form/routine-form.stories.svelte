<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import RoutineForm from './RoutineForm.svelte';

	const { Story } = defineMeta({
		component: RoutineForm,
	});

	import { buildEmptyRoutine } from '$lib/routine/routine.model';
</script>

<Story
	args={{
		routine: buildEmptyRoutine(),
	}}
	name="Primary"
/>
