<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Toggle from './Toggle.svelte';

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
