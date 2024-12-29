<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ReportTaskList from './ReportTaskList.svelte';

	const { Story } = defineMeta({
		component: ReportTaskList,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary"/>
