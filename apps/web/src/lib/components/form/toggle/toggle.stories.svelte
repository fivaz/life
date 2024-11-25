<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Toggle from './Toggle.svelte';

	const { Story } = defineMeta({
		component: Toggle,
	});
</script>

<Story
	name="Enable"
	args={{
		value: true,
	}}
/>

<Story
	name="Disabled"
	args={{
		label: 'Toggle',
		value: false,
	}}
/>
