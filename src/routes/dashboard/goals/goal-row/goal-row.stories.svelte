<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { goals } from '$lib/goal/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import GoalRow from './GoalRow.svelte';

	export const meta = {
		component: GoalRow,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<GoalRow>;
</script>

<Template let:args>
	<div class="w-96">
		<GoalRow {...args} />
	</div>
</Template>

<Story args={{ goal: goals[0] }} name="Primary" />
