<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Toggle from './Toggle.svelte';

	export const meta = {
		component: Toggle,
	} satisfies Meta<Toggle>;
</script>

<Template let:args>
	<Toggle {...args} />
</Template>

<Story
	args={{
		name: 'toggle',
		value: true,
	}}
	name="Enable"
/>

<Story
	args={{
		label: 'Toggle',
		name: 'toggle',
		value: false,
	}}
	name="Disabled"
/>
