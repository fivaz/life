<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Toggle from './Toggle.svelte';

	export const meta = {
		component: Toggle,
	} satisfies Meta<Toggle>;
</script>

<Template let:args>
	<Toggle {...args} name="toggle" />
</Template>

<Story
	args={{
		value: true,
	}}
	name="Enable"
/>

<Story
	args={{
		label: 'Toggle',
		value: false,
	}}
	name="Disabled"
/>
