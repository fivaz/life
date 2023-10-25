<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Input from './Input.svelte';

	export const meta = {
		component: Input,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Input>;
</script>

<Template let:args>
	<Input {...args} />
</Template>

<Story
	name="Primary"
	args={{
		type: 'time',
		name: 'endTime',
		value: '10:00',
		class:
			'block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
	}}
/>
