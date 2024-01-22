<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { tasks } from '$lib/task/seed';
	import DefaultSection from './DefaultSection.svelte';

	export const meta = {
		component: DefaultSection,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<DefaultSection>;
</script>

<Template let:args>
	<DefaultSection {...args} />
</Template>

<Story
	name="Primary"
	args={{
		task: tasks[0],
		targetDate: new Date(),
	}}
/>
