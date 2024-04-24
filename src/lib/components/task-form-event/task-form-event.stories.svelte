<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormEvent from './TaskFormEvent.svelte';

	export const meta = {
		argTypes: {},
		component: TaskFormEvent,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<TaskFormEvent>;
</script>

<Template let:args>
	<TaskFormEvent {...args} />
</Template>

<Story args={{}} name="Primary" />
