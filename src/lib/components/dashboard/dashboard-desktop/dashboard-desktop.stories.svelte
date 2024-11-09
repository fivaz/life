<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DashboardDesktop from './DashboardDesktop.svelte';

	const { Story } = defineMeta({
		component: DashboardDesktop,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
