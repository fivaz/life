<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ReportTask from './ReportTask.svelte';

	const { Story } = defineMeta({
		component: ReportTask,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary"/>
