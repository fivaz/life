<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import LineChart from './LineChart.svelte';

	const { Story } = defineMeta({
		component: LineChart,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
