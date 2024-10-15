<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import RoutineForm from './RoutineForm.svelte';
	import { buildEmptyRoutine } from './service';

	export const meta = {
		component: RoutineForm,
	} satisfies Meta<RoutineForm>;
</script>

<Template let:args>
	<RoutineForm
		{...args}
		on:close={() => console.log('closed')}
		routine={buildEmptyRoutine()}
		userId="0"
	/>
</Template>

<Story args={{}} name="Primary" />
