<script module lang="ts">
	import DashboardMobile from './DashboardMobile.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: DashboardMobile,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
