<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { buildEmptyGoal } from '../service';
	import GoalForm from './GoalForm.svelte';

	const { Story } = defineMeta({
		component: GoalForm,
	});
</script>

<Story
	args={{ userId: '0', goal: buildEmptyGoal(), close: () => console.log('closed') }}
	name="Primary"
/>
