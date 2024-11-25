<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import SideMenu from './SideMenu.svelte';

	const { Story } = defineMeta({
		component: SideMenu,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
