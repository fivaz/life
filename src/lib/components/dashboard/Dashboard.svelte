<script lang="ts">
	import Banner from '$lib/components/banner/Banner.svelte';
	import DashboardDesktop from '$lib/components/dashboard/dashboard-desktop/DashboardDesktop.svelte';
	import DashboardMobile from '$lib/components/dashboard/dashboard-mobile/DashboardMobile.svelte';
	import { demoLogin } from '$lib/consts';
	import { currentUser } from '$lib/auth/utils.svelte';
	import { type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex h-screen flex-col overflow-hidden md:flex-row">
	<DashboardDesktop class="hidden md:flex" />

	<DashboardMobile class="flex md:hidden" />

	<main class="mt-14 flex-1 overflow-y-auto md:mt-0">
		{#if currentUser.value?.email === demoLogin.email}
			<Banner />
		{/if}

		{@render children()}
	</main>
</div>
