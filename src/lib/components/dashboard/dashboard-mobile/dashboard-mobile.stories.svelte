<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DashboardMobile from './DashboardMobile.svelte';

	const { Story } = defineMeta({
		component: DashboardMobile,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
