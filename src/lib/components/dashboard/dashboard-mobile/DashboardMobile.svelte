<script lang="ts">
	import { Menu } from 'lucide-svelte';

	import { afterNavigate } from '$app/navigation';
	import SideMenu from '$lib/components/dashboard/side-menu/SideMenu.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { title } from '$lib/utils.svelte';

	interface Props {
		class?: string;
	}

	let { class: klass }: Props = $props();

	let showMenu = $state(false);

	afterNavigate(() => {
		// make sure the SideMenu is closed whenever the user uses it to navigate to another page
		if (showMenu) {
			showMenu = false;
		}
	});
</script>

<div class={klass}>
	<!--header-->
	<header class="fixed z-10 flex h-14 w-full justify-between gap-3 border-b bg-white p-4">
		<div class="flex items-center gap-2">
			<Logo class="h-8 w-8 text-indigo-600" />
			<h1 class="text-lg font-semibold text-gray-900">{title.value}</h1>
		</div>
		<button onclick={() => (showMenu = true)}>
			<Menu />
		</button>
	</header>

	<!--side menu-->
	<SideMenu
		class="fixed left-0 top-0 z-20 transform transition-transform duration-500
				{showMenu ? 'translate-x-0' : '-translate-x-full'}"
	/>

	<!--background-->
	<button
		aria-label="menu modal background"
		class="fixed left-0 right-0 top-0 z-10 h-full bg-black transition-opacity duration-300 {showMenu
			? 'bg-opacity-50'
			: 'pointer-events-none bg-opacity-0'}"
		onclick={() => (showMenu = false)}
	></button>
</div>
