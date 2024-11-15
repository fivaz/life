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
		close: () => console.log('closed'),
		routine: buildEmptyRoutine(),
		userId: '0',
	}}
	name="Primary"
/>
