<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { goals } from '$lib/goal/seed';
	import GoalRow from './GoalRow.svelte';

	export const meta = {
		component: GoalRow,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<GoalRow>;
</script>

<Template let:args>
	<div class="w-96">
		<GoalRow {...args} />
	</div>
</Template>

<Story name="Primary" args={{ goal: goals[0] }} />
