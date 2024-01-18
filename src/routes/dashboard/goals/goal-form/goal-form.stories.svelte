<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import GoalForm from './GoalForm.svelte';

	export const meta = {
		component: GoalForm,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<GoalForm>;
</script>

<Template let:args>
	<GoalForm {...args} />
</Template>

<Story
	name="Primary"
	args={{
		form: null,
	}}
/>
