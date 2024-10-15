<script lang="ts">
	import type { User } from '$lib/utils/store';

	import SideMenu from '$lib/components/side-menu/SideMenu.svelte';
	let className = '';
	export { className as class };

	export let currentUser: User;
</script>

<SideMenu class="{className} sticky top-0 border-r" {currentUser} />
