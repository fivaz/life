<script lang="ts">
	import type { User } from '$lib/auth/store';

	import DashboardDesktop from '$lib/components/dashboard-desktop/DashboardDesktop.svelte';
	import DashboardMobile from '$lib/components/dashboard-mobile/DashboardMobile.svelte';
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

<div class="flex h-screen flex-col md:flex-row">
	<DashboardDesktop class="hidden md:block" {currentUser} />

	<DashboardMobile class="block md:hidden" {currentUser} />

	<main class="flex-1 bg-red-500"><slot /></main>
</div>
