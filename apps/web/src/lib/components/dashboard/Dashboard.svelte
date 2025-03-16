<script lang="ts">
	import { bgColors } from '@life/shared/colors';
	import type { Snippet } from 'svelte';

	import Banner from '$lib/components/banner/Banner.svelte';
	import DashboardDesktop from '$lib/components/dashboard/dashboard-desktop/DashboardDesktop.svelte';
	import DashboardMobile from '$lib/components/dashboard/dashboard-mobile/DashboardMobile.svelte';
	import { demoLogin } from '$lib/consts';
	import { currentUser } from '$lib/user/user.utils.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div
	class="flex h-screen divide-x divide-gray-200 overflow-hidden dark:divide-gray-800 {bgColors.lighter}"
>
	<DashboardDesktop class="hidden md:flex" />

	<DashboardMobile class="flex md:hidden" />

	<main class="mt-14 flex-1 overflow-y-auto md:mt-0">
		{#if currentUser.email === demoLogin.email}
			<Banner />
		{/if}

		{@render children()}
	</main>
</div>
