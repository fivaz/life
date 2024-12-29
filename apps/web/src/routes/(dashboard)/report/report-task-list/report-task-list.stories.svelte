<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ReportTaskList from './ReportTaskList.svelte';

	const { Story } = defineMeta({
		component: ReportTaskList,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
