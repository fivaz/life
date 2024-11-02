<script module lang="ts">
	import RoutineForm from './RoutineForm.svelte';
	import { buildEmptyRoutine } from './service';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: RoutineForm,
	});
</script>

<Story
	args={{
		close: () => console.log('closed'),
		routine: buildEmptyRoutine(),
		userId: '0',
	}}
	name="Primary"
/>
