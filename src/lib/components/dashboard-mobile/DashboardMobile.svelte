<script lang="ts">
	import type { User } from '$lib/auth/store';

	import SideMenu from '$lib/components/side-menu/SideMenu.svelte';
	import { Menu } from 'lucide-svelte';

	let showMenu = false;
	let className = '';
	export { className as class };

	export let currentUser: User;
</script>

<div class={className}>
	<!--header-->
	<header class="flex gap-3 bg-blue-500">
		<button on:click={() => (showMenu = true)}>
			<Menu />
		</button>
		header
	</header>

	<!--side menu-->
	<SideMenu
		class="fixed left-0 top-0 z-20 transform transition-transform duration-300 {showMenu
			? 'translate-x-0'
			: '-translate-x-full'}"
		{currentUser}
	/>

	<!--background-->
	<button
		class="fixed left-0 right-0 top-0 z-10 h-full bg-black transition-opacity duration-300 {showMenu
			? 'bg-opacity-50'
			: 'pointer-events-none bg-opacity-0'}"
		on:click={() => (showMenu = false)}
	/>
</div>
