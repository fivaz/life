<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Input from './Input.svelte';

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
		label: 'Time',
	}}
	name="Primary"
/>
