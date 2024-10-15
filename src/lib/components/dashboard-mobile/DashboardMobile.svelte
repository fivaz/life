<script lang="ts">
	import { Menu } from 'lucide-svelte';

	let showMenu = false;
</script>

<div class="flex h-screen flex-col">
	<!--header-->
	<header class="flex gap-3 bg-blue-500">
		<button on:click={() => (showMenu = true)}>
			<Menu />
		</button>
		header
	</header>
	<!--side panel-->
	<div
		class="fixed left-0 top-0 z-20 h-full w-64 transform bg-green-500 transition-transform duration-300 {showMenu
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		side menu
	</div>
	<!--background-->
	<button
		class="fixed left-0 right-0 top-0 z-10 h-full bg-black transition-opacity duration-300 {showMenu
			? 'bg-opacity-50'
			: 'pointer-events-none bg-opacity-0'}"
		on:click={() => (showMenu = false)}
	/>
	<!--content-->
	<main class="flex-1 bg-red-500"></main>
</div>
