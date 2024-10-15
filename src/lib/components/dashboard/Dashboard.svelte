<script lang="ts">
	import type { User } from '$lib/utils/store';

	import Banner from '$lib/components/banner/Banner.svelte';
	import DashboardDesktop from '$lib/components/dashboard/dashboard-desktop/DashboardDesktop.svelte';
	import DashboardMobile from '$lib/components/dashboard/dashboard-mobile/DashboardMobile.svelte';
	import { demoLogin } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	let currentUser: User = null;

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			currentUser = user;
		});
	});
</script>

<div class="flex h-screen flex-col overflow-hidden md:flex-row">
	<DashboardDesktop class="hidden md:flex" {currentUser} />

	<DashboardMobile class="flex md:hidden" {currentUser} />

	<main class="mt-14 flex-1 overflow-y-auto md:mt-0">
		{#if currentUser?.email === demoLogin.email}
			<Banner />
		{/if}

		<slot />
	</main>
</div>
