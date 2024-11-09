<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TaskList from './TaskList.svelte';

	const { Story } = defineMeta({
		component: TaskList,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
