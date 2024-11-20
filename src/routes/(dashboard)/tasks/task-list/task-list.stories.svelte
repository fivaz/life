<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TaskList from './TaskList.svelte';

	const { Story } = defineMeta({
		component: TaskList,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
