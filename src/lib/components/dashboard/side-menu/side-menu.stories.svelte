<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import SideMenu from './SideMenu.svelte';

	const { Story } = defineMeta({
		component: SideMenu,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary" />
