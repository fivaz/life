<script module lang="ts">
	import Toggle from './Toggle.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: Toggle,
	});
</script>

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
