<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ReportTask from './ReportTask.svelte';

	const { Story } = defineMeta({
		component: ReportTask,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
