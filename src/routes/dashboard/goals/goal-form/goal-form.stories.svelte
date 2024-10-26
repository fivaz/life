<script context="module" lang="ts">
	import { buildEmptyGoal } from '../service';
	import GoalForm from './GoalForm.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: GoalForm,
	});
</script>

<Story
	args={{ userId: '0', goal: buildEmptyGoal(), close: () => console.log('closed') }}
	name="Primary"
/>
