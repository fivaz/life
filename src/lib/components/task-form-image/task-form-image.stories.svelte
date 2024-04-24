<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import TaskFormImage from './TaskFormImage.svelte';

	export const meta = {
		argTypes: {},
		component: TaskFormImage,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<TaskFormImage>;
</script>

<Template let:args>
	<TaskFormImage {...args} />
</Template>

<Story args={{}} name="Primary" />
