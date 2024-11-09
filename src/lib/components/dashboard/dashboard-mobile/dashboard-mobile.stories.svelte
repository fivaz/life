<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DashboardMobile from './DashboardMobile.svelte';

	const { Story } = defineMeta({
		component: DashboardMobile,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
