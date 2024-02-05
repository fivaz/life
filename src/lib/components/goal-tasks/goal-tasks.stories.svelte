<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { goals } from '$lib/goal/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import GoalTasks from './GoalTasks.svelte';

	export const meta = {
		component: GoalTasks,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<GoalTasks>;
</script>

<script>
</script>

<Template let:args>
	<GoalTasks {...args} />
</Template>

<Story args={{ goal: goals[0] }} name="Primary" />
