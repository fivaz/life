<script module lang="ts">
	
import { user } from '$lib/auth/seed';

	import SideMenu from './SideMenu.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: SideMenu,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{ currentUser: user }} name="Primary" />
