<script module lang="ts">
	import type { Meta } from '@storybook/svelte';

	import ToDoStats from './TasksStats.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: ToDoStats,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
