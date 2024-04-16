<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import GoalForm from './GoalForm.svelte';

	export const meta = {
		component: GoalForm,
	} satisfies Meta<GoalForm>;
</script>

<Template let:args>
	<GoalForm {...args} />
</Template>

<Story
	args={{
		form: null,
	}}
	name="Primary"
/>
