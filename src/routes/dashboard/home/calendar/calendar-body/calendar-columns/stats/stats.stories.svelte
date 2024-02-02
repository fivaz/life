<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { tasks } from '$lib/task/seed';
	import Stats from './Stats.svelte';

	export const meta = {
		component: Stats,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Stats>;
</script>

<Template let:args>
	<Stats {...args} />
</Template>

<Story
	name="Primary"
	args={{
		events: tasks,
	}}
/>

<Story
	name="Perfect Day"
	args={{
		events: tasks,
	}}
/>
