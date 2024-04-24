<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormRecurring from './TaskFormRecurring.svelte';

	export const meta = {
		argTypes: {},
		component: TaskFormRecurring,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<TaskFormRecurring>;
</script>

<Template let:args>
	<TaskFormRecurring {...args} />
</Template>

<Story args={{}} name="Primary" />
