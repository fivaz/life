<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { user } from '$lib/auth/seed';

	import SideMenu from './SideMenu.svelte';

	const { Story } = defineMeta({
		component: SideMenu,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{ currentUser: user }} name="Primary" />
