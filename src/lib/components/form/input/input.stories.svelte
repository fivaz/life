<script context="module" lang="ts">
	import Input from './Input.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: Input,
	});
</script>

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
