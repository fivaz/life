<script lang="ts">
	import DashboardDesktop from '$lib/components/dashboard-desktop/DashboardDesktop.svelte';
	import DashboardMobile from '$lib/components/dashboard-mobile/DashboardMobile.svelte';
</script>

<div class="flex h-screen flex-col md:flex-row">
	<DashboardDesktop class="hidden md:block" />

	<DashboardMobile class="block md:hidden" />

	<main class="flex-1 bg-red-500"><slot /></main>
</div>
