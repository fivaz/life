<script lang="ts">
	import SideMenu from '$lib/components/side-menu/SideMenu.svelte';
	import { type User, title } from '$lib/utils/store';
	import { Menu } from 'lucide-svelte';

	let showMenu = false;
	let className = '';
	export { className as class };

	export let currentUser: User;
</script>

<div class={className}>
	<!--header-->
	<header class="flex justify-between gap-3 border-b p-4">
		<h1 class="text-lg font-semibold text-gray-900">{$title}</h1>
		<button on:click={() => (showMenu = true)}>
			<Menu />
		</button>
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
