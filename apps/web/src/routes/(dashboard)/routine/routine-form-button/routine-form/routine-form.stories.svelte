<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { buildEmptyRoutine } from '$lib/routine/routine.model';

	import RoutineForm from './RoutineForm.svelte';

	const { Story } = defineMeta({
		component: RoutineForm,
	});
</script>

<Story name="Primary">
	<div class="w-[355px]">
		<RoutineForm routineIn={buildEmptyRoutine()} />
	</div>
</Story>
