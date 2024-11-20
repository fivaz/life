<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GoalForm from './GoalForm.svelte';

	const { Story } = defineMeta({
		component: GoalForm,
	});

	import { buildEmptyGoal } from '$lib/goal/goal.model';
</script>

<Story
	name="Primary"
	args={{ userId: '0', goal: buildEmptyGoal(), close: () => console.log('closed') }}
/>
