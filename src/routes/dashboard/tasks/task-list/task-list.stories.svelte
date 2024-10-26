<script module lang="ts">
	import type { Meta } from '@storybook/svelte';

	import TaskList from './TaskList.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: TaskList,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
