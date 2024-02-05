<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { tasks } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Stats from './Stats.svelte';

	export const meta = {
		component: Stats,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Stats>;
</script>

<Template let:args>
	<Stats {...args} />
</Template>

<Story
	args={{
		events: tasks,
	}}
	name="Primary"
/>

<Story
	args={{
		events: tasks,
	}}
	name="Perfect Day"
/>
