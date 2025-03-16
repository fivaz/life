<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import RoutineFormButton from './RoutineFormButton.svelte';

	const { Story } = defineMeta({
		component: RoutineFormButton,
	});

	import { buildEmptyRoutine } from '$lib/routine/routine.model';
</script>

<Story
	name="Primary"
	args={{
		routine: buildEmptyRoutine(),
	}}
/>
