<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Toggle from './Toggle.svelte';

	export const meta = {
		component: Toggle,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Toggle>;
</script>

<Template let:args>
	<Toggle {...args} />
</Template>

<Story
	name="Enable"
	args={{
		name: 'toggle',
		value: true,
	}}
/>

<Story
	name="Disabled"
	args={{
		name: 'toggle',
		label: 'Toggle',
		value: false,
	}}
/>
