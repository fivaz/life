<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { goals } from '$lib/goal/seed';
	import GoalTasks from './GoalTasks.svelte';

	export const meta = {
		component: GoalTasks,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<GoalTasks>;
</script>

<script>
</script>

<Template let:args>
	<GoalTasks {...args} />
</Template>

<Story name="Primary" args={{ goal: goals[0] }} />
