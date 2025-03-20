<script lang="ts">
	import { LText } from '@life/shared';
	import { MenuIcon } from 'lucide-svelte';

	import { afterNavigate } from '$app/navigation';
	import SideMenu from '$lib/components/dashboard/side-menu/SideMenu.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { title } from '$lib/utils.svelte';

	import HourglassIcon from '../../../../routes/(dashboard)/focus/hourglass-icon/HourglassIcon.svelte';
	import { timer } from '../../../../routes/(dashboard)/focus/service.svelte';
	import Timer from '../../../../routes/(dashboard)/focus/timer/Timer.svelte';

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
	<header
		class="fixed z-10 flex h-14 w-full justify-between gap-3 border-b border-gray-300 p-4 dark:border-gray-700"
	>
		<div class="flex items-center gap-2">
			<Logo class="size-8 text-indigo-600" />
			<LText class="text-lg font-semibold" tag="h2">{title.value}</LText>
		</div>
		<div class="flex items-center gap-5">
			{#if timer.status !== 'stopped'}
				<div class="flex items-center gap-1">
					<HourglassIcon class="text-indigo-600" />
					<Timer class="text-sm font-semibold text-indigo-600" />
				</div>
			{/if}
			<button onclick={() => (showMenu = true)}>
				<LText tag="span"><MenuIcon /></LText>
			</button>
		</div>
	</header>

	<!--side menu-->
	<SideMenu
		class="fixed left-0 top-0 z-20 transform bg-gray-50 transition-transform duration-500 dark:bg-gray-900 {showMenu
			? 'translate-x-0'
			: '-translate-x-full'}"
	/>

	<!--background-->
	{#if showMenu}
		<button
			class="fixed left-0 right-0 top-0 z-10 h-full bg-black/50"
			aria-label="menu modal background"
			onclick={() => (showMenu = false)}
		></button>
	{/if}
</div>
