<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ToDoStats from './TasksStats.svelte';

	const { Story } = defineMeta({
		component: ToDoStats,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
