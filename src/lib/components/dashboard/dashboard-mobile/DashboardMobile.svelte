<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import SideMenu from '$lib/components/dashboard/side-menu/SideMenu.svelte';
	import { title } from '$lib/utils';
	import { Menu } from 'lucide-svelte';

	let showMenu = false;
	let className = '';
	export { className as class };
</script>

<div class={className}>
	<!--header-->
	<header class="fixed z-10 flex h-14 w-full justify-between gap-3 border-b bg-white p-4">
		<div class="flex items-center gap-2">
			<Logo class="h-8 w-8 text-indigo-600" />
			<h1 class="text-lg font-semibold text-gray-900">{$title}</h1>
		</div>
		<button on:click={() => (showMenu = true)}>
			<Menu />
		</button>
	</header>

	<!--side menu-->
	<SideMenu
		class="fixed left-0 top-0 z-20 transform transition-transform duration-500 {showMenu
			? 'translate-x-0'
			: '-translate-x-full'}"
		on:click={() => (showMenu = false)}
	/>

	<!--background-->
	<button
		aria-label="menu modal background"
		class="fixed left-0 right-0 top-0 z-10 h-full bg-black transition-opacity duration-300 {showMenu
			? 'bg-opacity-50'
			: 'pointer-events-none bg-opacity-0'}"
		on:click={() => (showMenu = false)}
	></button>
</div>
