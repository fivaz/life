<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { buildEmptyGoal } from '../service';
	import GoalForm from './GoalForm.svelte';

	export const meta = {
		component: GoalForm,
	} satisfies Meta<GoalForm>;
</script>

<Template let:args>
	<GoalForm {...args} goal={buildEmptyGoal()} on:close={() => console.log('closed')} userId="0" />
</Template>

<Story name="Primary" />
