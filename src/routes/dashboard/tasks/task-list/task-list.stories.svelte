<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskList from './TaskList.svelte';

	export const meta = {
		argTypes: {},
		component: TaskList,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<TaskList>;
</script>

<Template let:args>
	<TaskList {...args} />
</Template>

<Story args={{}} name="Primary" />
