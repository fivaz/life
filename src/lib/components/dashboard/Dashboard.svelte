<script lang="ts">
	import Banner from '$lib/components/banner/Banner.svelte';
	import DashboardDesktop from '$lib/components/dashboard/dashboard-desktop/DashboardDesktop.svelte';
	import DashboardMobile from '$lib/components/dashboard/dashboard-mobile/DashboardMobile.svelte';
	import { demoLogin } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { currentUser } from '$lib/user/utils';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			currentUser.set(user);
		});
	});
</script>

<div class="flex h-screen flex-col overflow-hidden md:flex-row">
	<DashboardDesktop class="hidden md:flex" />

	<DashboardMobile class="flex md:hidden" />

	<main class="mt-14 flex-1 overflow-y-auto md:mt-0">
		{#if $currentUser?.email === demoLogin.email}
			<Banner />
		{/if}

		<slot />
	</main>
</div>
