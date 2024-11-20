<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DashboardDesktop from './DashboardDesktop.svelte';

	const { Story } = defineMeta({
		component: DashboardDesktop,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
