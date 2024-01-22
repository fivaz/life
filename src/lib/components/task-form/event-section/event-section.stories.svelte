<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { tasks } from '$lib/task/seed.js';
	import EventSection from './EventSection.svelte';

	export const meta = {
		component: EventSection,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<EventSection>;
</script>

<Template let:args>
	<EventSection {...args} />
</Template>

<Story
	name="Primary"
	args={{
		task: tasks[0],
	}}
/>
