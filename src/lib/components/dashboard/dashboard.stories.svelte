<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Dashboard from './Dashboard.svelte';

	const { Story } = defineMeta({
		component: Dashboard,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
