<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import ToDoStats from './TasksStats.svelte';

	export const meta = {
		argTypes: {},
		component: ToDoStats,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<ToDoStats>;
</script>

<Template let:args>
	<ToDoStats {...args} />
</Template>

<Story args={{}} name="Primary" />
