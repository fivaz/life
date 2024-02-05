<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Input from './Input.svelte';

	export const meta = {
		component: Input,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Input>;
</script>

<Template let:args>
	<Input {...args} />
</Template>

<Story
	args={{
		class:
			'block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
		name: 'endTime',
		type: 'time',
		value: '10:00',
	}}
	name="Primary"
/>
